import { useCart, useCartProducts } from "../../hooks/useCart";
import Modal from "./Modal";

import { motion } from "framer-motion";

import { RxCross1 } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

export default function Cart({ isOpen, onClose }) {
  const { data: products = [], isLoading } = useCartProducts();

  const {
    cart: items,
    cartTotal: total,

    cartCount: count,
    changeQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="h-full relative">
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex h-full w-full max-w-md absolute right-0 top-0 flex-col justify-between bg-parch shadow-2xl pointer-events-auto text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-7 border-b border-gray/10">
          <span className="text-gray uppercase tracking-widest font-medium text-[11px]">
            Tu carrito {count > 0 && "- " + count + " items"}
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="cursor-pointer"
          >
            <RxCross1 size={12} className="text-gray" />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-6 overflow-y-auto p-6">
          {products?.map((product, idx) => {
            const item = items.find((item) => item.id === product._id);

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
                      aria-label="Decrementar cantidad"
                      className="cursor-pointer"
                      onClick={() => changeQuantity(product, -1)}
                    >
                      -
                    </button>
                    <span className="">{item.cantidad}</span>
                    <button
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
          })}
        </div>

        <div className="flex flex-col gap-4 justify-between items-center p-7 border-t border-gray/10">
          <div className="flex items-center justify-between w-full">
            <span className="text-gray font-light text-sm">Subtotal</span>
            <span className="text-gray/90 uppercase font-black text-lg">
              {}ARS$
            </span>
          </div>

          <button
            aria-label="Continuar compra"
            className="uppercase w-full text-xs tracking-widest p-4 bg-pitch/20 text-gray cursor-pointer"
          >
            Continuar compra
          </button>
        </div>
      </motion.aside>
    </Modal>
  );
}
