import { Link } from "react-router-dom";
import { ROUTES } from "../routes/paths";

const formatPrice = (value) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);

export default function ProductCard({ product, onAddToCart }) {
  const sinStock = product.stock !== undefined && product.stock <= 0;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white">
      <Link to={ROUTES.PRODUCT(product.id)}>
        <img
          src={product.imagen}
          alt={product.nombre}
          className="h-56 w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4 font-inter">
        <span className="text-xs uppercase tracking-wide text-stone-500">
          {product.categoria}
        </span>
        <h3 className="font-display text-lg text-stone-900">
          <Link to={ROUTES.PRODUCT(product.id)}>{product.nombre}</Link>
        </h3>
        <p className="flex-1 text-sm text-stone-600">{product.descripcionCorta}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold">{formatPrice(product.precio)}</span>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={sinStock}
            className="rounded-md bg-stone-900 px-3 py-2 text-sm text-white hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            {sinStock ? "Sin stock" : "Añadir al carrito"}
          </button>
        </div>
      </div>
    </article>
  );
}
