import { useEffect, useRef, useState } from 'react';
import CheckoutForm from '@/components/features/checkout/CheckoutForm';
import Loader from '@/components/ui/feedback/Loader';
import { useCart, useCartProducts } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { createPayment } from '@/services/payment.api';
import { useMutation } from '@tanstack/react-query';
import { RxCross2 } from 'react-icons/rx';

export function Input({
  name,
  label,
  placeholder,
  value,
  onChange,
  isRequired = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-pitch/80 text-[11px] font-bold uppercase tracking-wider">
        {label}
      </span>
      <input
        type="text"
        name={name}
        required={isRequired}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-pitch/30 px-4 font-medium text-sm py-2.5 text-pitch focus:border-pitch/80 outline-none"
      />
    </div>
  );
}

export default function Checkout() {
  const { isAuthenticated, user } = useAuth();

  const {
    cart: items,
    cartCount: count,
    changeQuantity,
    removeFromCart,
  } = useCart();

  const { data: products = [], isLoading } = useCartProducts({
    cart: items,
    count,
  });

  const paymentFormRef = useRef(null);

  const [mpInstance, setMpInstance] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  // Estado del formulario de envío
  const [shipping, setShipping] = useState({
    first_name: '',
    last_name: '',
    address: '',
    zip_code: '',
    city: '',
  });

  const setField = (e) => {
    setShipping((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mutation = useMutation({
    mutationFn: (paymentData) => createPayment(paymentData),
    onSuccess: (data) => {
      console.log('Pago exitoso:', data);
    },
    onError: (error) => {
      console.error('Error en el pago:', error);
    },
  });

  const handleConfirm = async (e) => {
    e.preventDefault();

    const { first_name, last_name, address, zip_code, city } = shipping;
    if (!first_name || !last_name || !address || !zip_code || !city) {
      alert('Por favor completá todos los campos de información de envío.');
      return;
    }

    if (count <= 0) {
      alert('El carrito está vacío.');
      return;
    }

    // 2. Generar token y construir paymentData desde el form de MP
    if (!paymentFormRef.current) return;
    const paymentData = await paymentFormRef.current.submitPayment();

    if (!paymentData) return; // submitPayment ya loguea el error

    console.log('PAYMENT: ', paymentData);

    // 3. Adjuntar datos de envío al payload
    const fullPayload = {
      payment: paymentData,
      shipping: {
        first_name,
        last_name,
        address,
        zip_code,
        city,
      },
    };

    console.log('Payload completo:', fullPayload);
    mutation.mutate(fullPayload);
  };

  useEffect(() => {
    document.title = `Hermanos Jota - Checkout`;

    return () => {
      document.title = 'Hermanos Jota';
    };
  }, []);

  // TODO: Cambiar a {formatPrice(product.finalPrice?.$numberDecimal || product.finalPrice)}
  const total = items.reduce((total, item) => {
    const product = products.find((p) => p._id === item.id);

    if (!product) return total;

    return total + product.price.$numberDecimal * item.cantidad;
  }, 0);

  return (
    <main className="p-8 sm:px-10 lg:px-40 lg:py-16 bg-parch min-h-screen relative">
      <div className="relative">
        <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-bold text-pitch">
          Checkout
        </h1>

        <form
          onSubmit={handleConfirm}
          className="grid grid-cols-1 xl:grid-cols-3 gap-y-4 xl:gap-20 mt-6"
        >
          {/** Inputs divididos */}
          <div className="col-span-2 flex flex-col gap-8">
            <section>
              <div className="flex items-center gap-4">
                <span className="tabular-nums text-[11px] font-bold text-bordeau">
                  01
                </span>
                <span className="font-bold text-carbon text-2xl">
                  Información de envío
                </span>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col justify-between lg:flex-row gap-4 *:w-full">
                  <Input
                    name="first_name"
                    label="Nombre"
                    placeholder="Jeremías"
                    value={shipping.first_name}
                    onChange={(e) => setField(e)}
                    isRequired
                  />
                  <Input
                    name="last_name"
                    label="Apellido"
                    placeholder="Vivaldi"
                    value={shipping.last_name}
                    onChange={(e) => setField(e)}
                    isRequired
                  />
                </div>

                <div className="flex flex-col justify-between lg:flex-row gap-2 *:w-full">
                  <Input
                    name="address"
                    label="Dirección"
                    placeholder="Rua da Boldavista 2365"
                    value={shipping.address}
                    onChange={(e) => setField(e)}
                    isRequired
                  />
                  <Input
                    name="zip_code"
                    label="Código postal"
                    placeholder="B4400EED"
                    value={shipping.zip_code}
                    onChange={(e) => setField(e)}
                    isRequired
                  />
                  <Input
                    name="city"
                    label="Ciudad"
                    placeholder="Ciudad de Buenos Aires"
                    value={shipping.city}
                    onChange={(e) => setField(e)}
                    isRequired
                  />
                </div>
              </div>
            </section>

            <section>
              <div className={`flex items-center gap-4 mb-4`}>
                <span className="tabular-nums text-[11px] font-bold text-bordeau">
                  02
                </span>
                <span className="font-bold text-carbon text-2xl">
                  Pasarela de pago
                </span>
              </div>

              <CheckoutForm
                ref={paymentFormRef}
                isAuthenticated={isAuthenticated}
                user={user}
                mpInstance={mpInstance}
                setMpInstance={setMpInstance}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </section>
          </div>

          {/* Resumen del pedido */}
          <div className="col-span-1 lg:sticky lg:top-[calc(6rem)] self-start">
            <aside className="border border-pitch/30 p-6 flex flex-col gap-6">
              <p className="font-bold text-xs text-pitch uppercase tracking-wider">
                Resumen del pedido
              </p>

              <div className="flex flex-col gap-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader size={18} color="#22272562" />
                  </div>
                ) : products.length === 0 ? (
                  <span className="text-pitch/60 text-sm text-center py-6">
                    No hay productos en el carrito
                  </span>
                ) : (
                  products.map((product) => {
                    const item = items.find((item) => item.id === product._id);

                    // TODO: Hacer un componente para este apartado y Cart.jsx
                    return (
                      <div
                        key={product._id}
                        className="flex items-start justify-between gap-3"
                      >
                        <img
                          src={product.image_url[0]}
                          alt={product.name}
                          className="w-18 h-full min-h-24 object-cover border border-pitch/40"
                        />
                        <div className="flex flex-col gap-1 flex-1 justify-between items-start h-full">
                          <span className="text-[13px] font-medium text-pitch/80 tracking-tight line-clamp-1">
                            {product.name}
                          </span>
                          <span className="text-[10px] text-gray/60 font-light tracking-tight">
                            {product.category}
                          </span>

                          <div className="flex items-center justify-between w-fit *:py-1.5 *:px-1 px-2 gap-4 border border-pitch/20 *:text-pitch/60 text-xs">
                            <button
                              type="button"
                              aria-label="Decrementar cantidad"
                              className="cursor-pointer"
                              onClick={() => changeQuantity(product, -1)}
                            >
                              -
                            </button>
                            <span className="">{item.cantidad}</span>
                            <button
                              type="button"
                              aria-label="Incrementar cantidad"
                              className="cursor-pointer"
                              onClick={() => changeQuantity(product, 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label="Eliminar producto"
                            className="p-1 rounded-full border border-pitch/20 cursor-pointer text-pitch/60"
                            onClick={() => removeFromCart(product._id)}
                          >
                            <RxCross2 size={14} className=" cursor-pointer" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex items-center justify-between border-y border-pitch/20 py-3 tracking-tight">
                <span className="text-pitch/60 text-sm">
                  Subtotal ({count || 0})
                </span>
                <span className="text-pitch/90 uppercase font-bold text-sm">
                  {total.toFixed(1)} ARS$
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-pitch/80 text-sm">Total</span>

                  <span className="text-pitch/90 uppercase font-black text-xl">
                    {total.toFixed(1)} ARS$
                  </span>
                </div>
                <p className="text-pitch/60 text-sm">
                  Devoluciones en un plazo de treinta días. Un año de
                  reparaciones gratuitas. Respuestas a cargo de una persona,
                  generalmente el mismo día.
                </p>
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="cursor-pointer uppercase text-parch bg-bordeau tracking-wider hover:bg-bordeau/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full text-xs font-bold py-5"
              >
                {mutation.isPending ? 'Procesando...' : 'Confirmar pedido'}
              </button>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}
