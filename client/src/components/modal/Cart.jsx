import { useCart } from "../../hooks/useCart";
import Modal from "./Modal";

import { motion } from "framer-motion";

import { RxCross1 } from "react-icons/rx";

export default function Cart({ isOpen, onClose }) {
  const {
    cart: items,
    cartTotal: total,

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
            Tu carrito
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
