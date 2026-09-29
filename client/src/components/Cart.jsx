import { formatPrice } from "../utils/formatPrice";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const {
    cart: items,
    cartTotal: total,
    isCartOpen,
    closeCart,
    changeQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={closeCart}>
      <aside
        className="flex h-full w-full max-w-md flex-col bg-white p-6 font-inter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl">Tu carrito</h2>
          <button type="button" onClick={closeCart} aria-label="Cerrar carrito">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-stone-600">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto">
              {items.map((item) => (
                <li key={item._id} className="flex gap-3">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm text-stone-600">{formatPrice(item.price)}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => changeQuantity(item._id, -1)}
                        className="h-6 w-6 rounded border"
                      >
                        −
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        type="button"
                        onClick={() => changeQuantity(item._id, 1)}
                        className="h-6 w-6 rounded border"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item._id)}
                        className="ml-auto text-sm text-red-600"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t pt-4">
              <p className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </p>
              <button
                type="button"
                onClick={clearCart}
                className="mt-3 w-full rounded-md border py-2 text-sm"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
