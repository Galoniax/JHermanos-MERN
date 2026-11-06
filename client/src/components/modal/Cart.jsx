import { ROUTES } from '@/routes/paths';
import { useCart, useCartProducts } from '../../hooks/useCart';
import Modal from './Modal';

import { motion } from 'framer-motion';

import { RxCross1 } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import { ToastComponent } from '../ui/feedback/ToastComponent';

export default function Cart() {
  const navigate = useNavigate();

  const {
    cart: items,
    cartCount: count,
    changeQuantity,
    removeFromCart,
    clearCart,
    isOpen,
    setIsOpen,
  } = useCart();

  const {
    data: products = [],
    isLoading,
    error,
    isError,
  } = useCartProducts({
    cart: items,
    count,
  });

  // TODO: Cambiar a {formatPrice(product.finalPrice?.$numberDecimal || product.finalPrice)}
  const total = items.reduce((total, item) => {
    const product = products.find((p) => p._id === item.id);

    if (!product) return total;

    return total + product.price.$numberDecimal * item.cantidad;
  }, 0);

  if (isError) {
    toast.error(
      <ToastComponent
        message={error.error}
        status={error.status}
        type="error"
        closeToast={() => toast.dismiss()}
      />
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      className="h-full relative"
    >
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex h-full w-full max-w-md absolute right-0 top-0 flex-col justify-between bg-parch shadow-2xl pointer-events-auto text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-7 border-b border-gray/10">
          <span className="text-gray uppercase tracking-widest font-medium text-[11px]">
            Tu carrito {count > 0 && '- ' + count + ' items'}
          </span>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar carrito"
            className="cursor-pointer"
          >
            <RxCross1 size={12} className="text-gray" />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-6 overflow-y-auto overscroll-contain p-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex gap-3 opacity-70 brightness-90"
                >
                  <Skeleton
                    height="6rem"
                    width={64}
                    baseColor="var(--parch)"
                    highlightColor="#ffffff"
                    duration={2}
                    borderRadius="0px"
                  />

                  <div className="flex flex-col gap-1 flex-1">
                    <Skeleton
                      count={2}
                      baseColor="var(--parch)"
                      highlightColor="#ffffff"
                      duration={2}
                      borderRadius="2px"
                    />
                  </div>
                </div>
              ))
            : products &&
              products.length > 0 &&
              products.map((product) => {
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
                      <div>
                        <span className="text-sm font-medium text-pitch/80 tracking-tight line-clamp-1">
                          {product.name}
                        </span>
                        <span className="text-xs text-gray/80 font-light">
                          {product.category?.name}
                        </span>
                      </div>

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
              })}

          {!isError && !isLoading && count === 0 && (
            <div className="flex justify-center items-center h-full">
              <p className="text-pitch/80 text-sm">El carrito está vacío</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 justify-between items-center p-7 border-t border-gray/10">
          <div className="flex items-center justify-between w-full">
            <span className="text-gray font-light text-sm">Subtotal</span>
            <span className="text-gray/90 uppercase font-black text-lg">
              {total.toFixed(1)} ARS$
            </span>
          </div>

          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate(ROUTES.CHECKOUT);
              }}
              disabled={count === 0}
              aria-label="Continuar compra"
              className="uppercase flex-1 w-full text-xs tracking-wide p-3.5 text-parch hover:bg-bordeau/90 transition-all cursor-pointer bg-bordeau disabled:bg-pitch/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar compra
            </button>
            <button
              type="button"
              onClick={clearCart}
              disabled={count === 0}
              aria-label="Limpiar carrito"
              className="border border-gray/40 group p-3.5 cursor-pointer hover:bg-gray duration-300 transition-colors"
            >
              <FaTrashAlt
                className="text-gray group-hover:text-parch/80"
                size={16}
              />
            </button>
          </div>
        </div>
      </motion.aside>
    </Modal>
  );
}
