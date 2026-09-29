const formatPrice = (value) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);

export default function Cart({
  open,
  items,
  onClose,
  onChangeQuantity,
  onRemove,
  onClear,
}) {
  if (!open) return null;

  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <aside
        className="flex h-full w-full max-w-md flex-col bg-white p-6 font-inter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl">Tu carrito</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar carrito">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-stone-600">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.nombre}</p>
                    <p className="text-sm text-stone-600">{formatPrice(item.precio)}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onChangeQuantity(item.id, -1)}
                        className="h-6 w-6 rounded border"
                      >
                        −
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        type="button"
                        onClick={() => onChangeQuantity(item.id, 1)}
                        className="h-6 w-6 rounded border"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
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
                onClick={onClear}
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
