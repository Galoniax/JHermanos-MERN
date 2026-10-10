import { useEffect, useState } from "react";
import CheckoutForm from "@/components/features/checkout/CheckoutForm";
import Loader from "@/components/ui/feedback/Loader";
import { useCart, useCartProducts } from "@/hooks/useCart";

function Input({ label, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-pitch/80 text-[11px] font-bold uppercase tracking-wider">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-pitch/30 px-4 py-2.5 text-pitch focus:border-pitch/80"
      />
    </div>
  );
}

export default function Checkout() {
  const [toCreate, setToCreate] = useState(false);

  const { data: products = [], isLoading } = useCartProducts();
  const { cartTotal: total, cartCount: count } = useCart();

  useEffect(() => {
    document.title = `Hermanos Jota - Checkout`;

    return () => {
      document.title = "Hermanos Jota";
    };
  }, []);

  return (
    <main className="px-4 sm:px-10 md:px-40 py-2 sm:py-6 md:py-18 bg-parch min-h-screen relative">
      <div className="absolute inset-0 bg-parch bg-[url('https://www.transparenttextures.com/patterns/classy-fabric.png')] bg-center opacity-20 pointer-events-none" />

      <div className="relative">
        <h1 className="text-[3.8rem] font-bold text-pitch">Checkout</h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-4 xl:gap-20 mt-6">
          {/** Inputs divididos */}
          <div className="col-span-2">
            {/* Information Section */}
            <section className="mb-8">
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
                    label="Nombre"
                    placeholder="Jeremías"
                    value=""
                    onChange={() => {}}
                  />

                  <Input
                    label="Apellido"
                    placeholder="Vivaldi"
                    value=""
                    onChange={() => {}}
                  />
                </div>

                <Input
                  label="Dirección"
                  placeholder="Rua da Boldavista 2365"
                  value=""
                  onChange={() => {}}
                />

                <div className="flex flex-col justify-between lg:flex-row gap-4 *:w-full">
                  <Input
                    label="Código postal"
                    placeholder="B4400EED"
                    value=""
                    onChange={() => {}}
                  />

                  <Input
                    label="Ciudad"
                    placeholder="Ciudad de Buenos Aires"
                    value=""
                    onChange={() => {}}
                  />
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="tabular-nums text-[11px] font-bold text-bordeau">
                  02
                </span>
                <span className="font-bold text-carbon text-2xl">
                  Pasarela de pago
                </span>
              </div>
              <CheckoutForm />
            </section>
          </div>

          {/* Resumen del pedido */}
          <div className="col-span-1">
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
                  {total.toFixed(2)} ARS$
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-pitch/80 text-sm">Total</span>

                  <span className="text-pitch/90 uppercase font-black text-xl">
                    {total.toFixed(2)} ARS$
                  </span>
                </div>
                <p className="text-pitch/60 text-sm">
                  Devoluciones en un plazo de treinta días. Un año de
                  reparaciones gratuitas. Respuestas a cargo de una persona,
                  generalmente el mismo día.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
