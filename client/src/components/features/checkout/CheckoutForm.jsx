import { MP_PUBLIC_KEY } from '@/api/config/config';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { forwardRef, useEffect, useImperativeHandle } from 'react';

const fieldStyles = {
  style: {
    fontSize: '0.875rem',
    color: '#121110',
  },
};

const CheckoutForm = forwardRef(
  (
    {
      isAuthenticated,
      user,
      mpInstance,
      setMpInstance,
      paymentMethod,
      setPaymentMethod,
    },
    ref
  ) => {
    useEffect(() => {
      const initMercadoPago = async () => {
        await loadMercadoPago();

        const mp = new window.MercadoPago(`${MP_PUBLIC_KEY}`, {
          locale: 'es-AR',
        });

        setMpInstance(mp);

        // Elementos del DOM
        const issuerElement = document.getElementById('form-checkout__issuer');
        const installmentsElement = document.getElementById(
          'form-checkout__installments'
        );
        let currentBin;

        const cardNumberElement = mp.fields
          .create('cardNumber', {
            placeholder: 'Número de la tarjeta',
            ...fieldStyles,
          })
          .mount('form-checkout__cardNumber');

        const expirationDateElement = mp.fields
          .create('expirationDate', { placeholder: 'MM/YY', ...fieldStyles })
          .mount('form-checkout__expirationDate');

        const securityCodeElement = mp.fields
          .create('securityCode', {
            placeholder: 'Código de seguridad',
            ...fieldStyles,
          })
          .mount('form-checkout__securityCode');

        // Funciones de ayuda
        function createSelectOptions(
          elem,
          options,
          labelsAndKeys = { label: 'name', value: 'id' }
        ) {
          const { label, value } = labelsAndKeys;
          elem.options.length = 0;
          const tempOptions = document.createDocumentFragment();
          options.forEach((option) => {
            const optValue = option[value];
            const optLabel = option[label];
            const opt = document.createElement('option');
            opt.value = optValue;
            opt.style.fontSize = '0.875rem';
            opt.style.color = '#121110';
            opt.textContent = optLabel;
            tempOptions.appendChild(opt);
          });
          elem.appendChild(tempOptions);
        }

        function clearSelectsAndSetPlaceholders() {
          clearHTMLSelectChildrenFrom(issuerElement);
          createSelectElementPlaceholder(issuerElement, 'Banco emisor');
          clearHTMLSelectChildrenFrom(installmentsElement);
          createSelectElementPlaceholder(installmentsElement, 'Cuotas');
        }

        function clearHTMLSelectChildrenFrom(element) {
          if (!element) return;
          const currOptions = [...element.children];
          currOptions.forEach((child) => child.remove());
        }

        function createSelectElementPlaceholder(element, placeholder) {
          if (!element) return;
          const optionElement = document.createElement('option');
          optionElement.textContent = placeholder;
          optionElement.setAttribute('selected', '');
          optionElement.setAttribute('disabled', '');
          element.appendChild(optionElement);
        }

        // Obtener tipos de documento
        /*(async function getIdentificationTypes() {
        try {
          const identificationTypes = await mp.getIdentificationTypes();
          console.log("identificationTypes: ", identificationTypes);
          const identificationTypeElement = document.getElementById(
            "form-checkout__identificationType",
          );
          createSelectOptions(identificationTypeElement, identificationTypes);
        } catch (e) {
          console.error("Error getting identificationTypes: ", e);
        }
      })();*/

        cardNumberElement.on('binChange', async (data) => {
          const { bin } = data;
          console.log('bin: ', bin);
          try {
            if (!bin) {
              clearSelectsAndSetPlaceholders();
            }

            if (bin && bin !== currentBin) {
              const { results } = await mp.getPaymentMethods({ bin });
              const paymentMethod = results[0];

              setPaymentMethod(paymentMethod);

              updatePCIFieldsSettings(paymentMethod);
              updateInstallments(paymentMethod, bin);
            }
            currentBin = bin;
          } catch (e) {
            console.error('error getting payment methods: ', e);
          }
        });

        function updatePCIFieldsSettings(paymentMethod) {
          const { settings } = paymentMethod;
          console.log('settings: ', settings);
          cardNumberElement.update({ settings: settings[0].card_number });
          securityCodeElement.update({ settings: settings[0].security_code });
        }

        // LÓGICA AGREGADA: Actualización de cuotas tomando el valor del input hidden
        async function updateInstallments(paymentMethod, bin) {
          try {
            const installments = await mp.getInstallments({
              amount: document.getElementById('transactionAmount').value,
              bin,
              paymentTypeId: 'credit_card',
            });
            console.log('installments: ', installments);
            const installmentOptions = installments[0].payer_costs;
            const installmentOptionsKeys = {
              label: 'recommended_message',
              value: 'installments',
            };
            createSelectOptions(
              installmentsElement,
              installmentOptions,
              installmentOptionsKeys
            );
          } catch (e) {
            console.error('error getting installments: ', e);
          }
        }

        return () => {
          cardNumberElement.unmount();
          expirationDateElement.unmount();
          securityCodeElement.unmount();
        };
      };

      initMercadoPago();
    }, [setMpInstance, setPaymentMethod]);

    useImperativeHandle(ref, () => ({
      submitPayment: async () => {
        if (!mpInstance) return null;
        if (!isAuthenticated || !user?.email || !user?.dni) return null;

        try {
          const tokenElement = document.getElementById('token');

          tokenElement.value = '';

          const token = await mpInstance.fields.createCardToken({
            cardholderName: document.getElementById(
              'form-checkout__cardholderName'
            ).value,
            identificationType: 'DNI',
            identificationNumber: user.dni,
          });

          tokenElement.value = token.id;

          const paymentData = {
            token: token.id,
            transaction_amount: Number(
              document.getElementById('transactionAmount').value
            ),
            payment_method_id: paymentMethod.id,
            installments: Number(
              document.getElementById('form-checkout__installments').value
            ),
            issuer_id: paymentMethod.issuer.id,
            payer: {
              email: user.email,
              identification: { type: 'DNI', number: user.dni },
            },
          };

          return paymentData;
        } catch (e) {
          console.error('Error al crear el token de la tarjeta: ', e);
          return null;
        }
      },
    }));

    const labelClass =
      'text-pitch/80 text-[11px] font-bold uppercase tracking-wider';

    const fieldClass =
      'w-full border h-11 border border-pitch/30 px-4 py-2 text-pitch focus:border-pitch/80 outline-none';

    return (
      <div id="form-checkout" className="flex flex-col gap-4 mx-auto">
        <div className="flex items-center flex-col md:flex-row gap-2">
          <div className="flex flex-col gap-2 w-full">
            <span className={`${labelClass}`}>Titular de la tarjeta</span>
            <input
              id="form-checkout__cardholderName"
              placeholder="Titular de la tarjeta"
              className={fieldClass}
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <span className={`${labelClass} whitespace-nowrap`}>
              Fecha de vencimiento
            </span>
            <div
              id="form-checkout__expirationDate"
              className={`${fieldClass}`}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="flex flex-col gap-2 w-full">
            <span className={`${labelClass}`}>Número de tarjeta</span>
            <div
              id="form-checkout__cardNumber"
              className={`${fieldClass} relative`}
            >
              {paymentMethod?.thumbnail && (
                <img
                  src={paymentMethod?.thumbnail}
                  alt="Thumbnail de tarjeta"
                  className="absolute right-4 top-1/2 transform object-contain -translate-y-1/2 "
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className={`${labelClass}`}>CVV</span>
            <div id="form-checkout__securityCode" className={`${fieldClass}`} />
          </div>
        </div>
        <select
          id="form-checkout__installments"
          name="installments"
          defaultValue=""
          className={`${fieldClass}`}
          required
        >
          <option
            style={{ fontSize: '0.875rem', color: '#121110' }}
            value=""
            disabled
          >
            Cuotas
          </option>
        </select>
        {/* INPUTS OCULTOS REQUERIDOS POR LA LÓGICA */}
        <input id="token" name="token" type="hidden" />
        <input id="paymentMethodId" name="paymentMethodId" type="hidden" />
        <input
          id="transactionAmount"
          name="transactionAmount"
          type="hidden"
          value="10"
          // TODO: Poner el total del carrito
        />
      </div>
    );
  }
);

CheckoutForm.displayName = 'CheckoutForm';

export default CheckoutForm;
