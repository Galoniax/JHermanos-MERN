import { MP_PUBLIC_KEY } from "@/api/config/config";
import { useAuth } from "@/hooks/useAuth";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { useEffect, useState } from "react";

export default function CheckoutForm() {
  const [mpInstance, setMpInstance] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState(null);

  console.log("paymentMethod: ", paymentMethod);

  const { user, isAuthenticated } = useAuth();

  console.log("MP: ", mpInstance);

  useEffect(() => {
    const initMercadoPago = async () => {
      await loadMercadoPago();

      const mp = new window.MercadoPago(`${MP_PUBLIC_KEY}`, {
        locale: "es-AR",
      });
      setMpInstance(mp);

      const cardNumberElement = mp.fields
        .create("cardNumber", { placeholder: "Número de la tarjeta" })
        .mount("form-checkout__cardNumber");

      const expirationDateElement = mp.fields
        .create("expirationDate", { placeholder: "MM/YY" })
        .mount("form-checkout__expirationDate");

      const securityCodeElement = mp.fields
        .create("securityCode", { placeholder: "Código de seguridad" })
        .mount("form-checkout__securityCode");

      // Funciones de ayuda
      function createSelectOptions(
        elem,
        options,
        labelsAndKeys = { label: "name", value: "id" },
      ) {
        const { label, value } = labelsAndKeys;
        elem.options.length = 0;
        const tempOptions = document.createDocumentFragment();
        options.forEach((option) => {
          const optValue = option[value];
          const optLabel = option[label];
          const opt = document.createElement("option");
          opt.value = optValue;
          opt.textContent = optLabel;
          tempOptions.appendChild(opt);
        });
        elem.appendChild(tempOptions);
      }

      function clearSelectsAndSetPlaceholders() {
        clearHTMLSelectChildrenFrom(issuerElement);
        createSelectElementPlaceholder(issuerElement, "Banco emisor");
        clearHTMLSelectChildrenFrom(installmentsElement);
        createSelectElementPlaceholder(installmentsElement, "Cuotas");
      }

      function clearHTMLSelectChildrenFrom(element) {
        const currOptions = [...element.children];
        currOptions.forEach((child) => child.remove());
      }

      function createSelectElementPlaceholder(element, placeholder) {
        const optionElement = document.createElement("option");
        optionElement.textContent = placeholder;
        optionElement.setAttribute("selected", "");
        optionElement.setAttribute("disabled", "");
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

      // Elementos del DOM
      const issuerElement = document.getElementById("form-checkout__issuer");
      const installmentsElement = document.getElementById(
        "form-checkout__installments",
      );
      let currentBin;

      cardNumberElement.on("binChange", async (data) => {
        const { bin } = data;
        console.log("bin: ", bin);
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
          console.error("error getting payment methods: ", e);
        }
      });

      function updatePCIFieldsSettings(paymentMethod) {
        const { settings } = paymentMethod;
        console.log("settings: ", settings);
        cardNumberElement.update({ settings: settings[0].card_number });
        securityCodeElement.update({ settings: settings[0].security_code });
      }

      // LÓGICA AGREGADA: Actualización de cuotas tomando el valor del input hidden
      async function updateInstallments(paymentMethod, bin) {
        try {
          const installments = await mp.getInstallments({
            amount: document.getElementById("transactionAmount").value,
            bin,
            paymentTypeId: "credit_card",
          });
          console.log("installments: ", installments);
          const installmentOptions = installments[0].payer_costs;
          const installmentOptionsKeys = {
            label: "recommended_message",
            value: "installments",
          };
          createSelectOptions(
            installmentsElement,
            installmentOptions,
            installmentOptionsKeys,
          );
        } catch (e) {
          console.error("error getting installments: ", e);
        }
      }

      return () => {
        cardNumberElement.unmount();
        expirationDateElement.unmount();
        securityCodeElement.unmount();
      };
    };

    initMercadoPago();
  }, []);

  // LÓGICA AGREGADA: Manejo del formulario adaptado a React
  const handleSubmit = async (e) => {
    e.preventDefault(); // Detenemos el envío nativo del formulario
    if (!mpInstance) return;

    if (!isAuthenticated && !user.email && !user.dni) {
      return;
    }

    try {
      const tokenElement = document.getElementById("token");

      // Si el input oculto de token está vacío, generamos uno nuevo
      if (!tokenElement.value) {
        const token = await mpInstance.fields.createCardToken({
          cardholderName: document.getElementById(
            "form-checkout__cardholderName",
          ).value,
          identificationType: "DNI",
          identificationNumber: user.dni,
        });

        tokenElement.value = token.id; // Guardamos el ID generado en el input oculto
        console.log("Token de tarjeta creado:", token.id);

        // A PARTIR DE AQUÍ: Envías la información a tu backend
        // En lugar de formElement.requestSubmit(), en React usualmente hacemos un fetch:

        const paymentData = {
          token: token.id,
          transaction_amount: Number(
            document.getElementById("transactionAmount").value,
          ),
          payment_method_id: paymentMethod.id,
          installments: Number(
            document.getElementById("form-checkout__installments").value,
          ),
          issuer_id: paymentMethod.issuer.id,
          payer: {
            email: user.email,
            identification: {
              type: "DNI",
              number: user.dni,
            },
          },
        };

        // Ejemplo de envío a tu backend:
        /*
        await fetch('/process_payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentData)
        });
        */
      }
    } catch (e) {
      console.error("Error al crear el token de la tarjeta: ", e);
    }
  };

  const labelClass =
    "text-pitch/80 text-[11px] font-bold uppercase tracking-wider";

  const fieldClass =
    "border h-12 border border-pitch/30 px-4 py-2.5 text-pitch focus:border-pitch/80";

  return (
    <form
      id="form-checkout"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mx-auto"
    >
      <div className="flex flex-col gap-2 w-full">
        <span className={`${labelClass}`}>Email</span>

        <input
          id="form-checkout__email"
          name="email"
          type="email"
          placeholder="E-mail"
          className={fieldClass}
          readOnly
          // TODO: Arreglar esto
          //value={user.email}
        />
      </div>
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

        <div className="flex flex-col gap-2">
          <span className={`${labelClass} whitespace-nowrap`}>
            Fecha de vencimiento
          </span>
          <div id="form-checkout__expirationDate" className={`${fieldClass}`} />
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
        <div className="flex flex-col gap-2">
          <span className={`${labelClass}`}>CVV</span>
          <div id="form-checkout__securityCode" className={`${fieldClass}`} />
        </div>
      </div>
      <select
        id="form-checkout__installments"
        name="installments"
        defaultValue=""
        className="border p-2"
        required
      >
        <option value="" disabled>
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
      <button
        type="submit"
        id="form-checkout__submit"
        className="cursor-pointer uppercase text-parch bg-bordeau tracking-wider hover:bg-bordeau/80 transition-colors w-full text-xs font-bold py-5"
      >
        Confirmar detalles
      </button>
    </form>
  );
}
