import { Link } from "react-router-dom";
import { ROUTES } from "../routes/paths";
import { formatPrice } from "../utils/formatPrice";

export default function ProductCard({ product, onAddToCart }) {
  const sinStock = product.stock <= 0;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white">
      <Link to={ROUTES.PRODUCT(product._id)}>
        <img
          src={product.image_url}
          alt={product.name}
          className="h-56 w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4 font-inter">
        <h3 className="font-display text-lg text-stone-900">
          <Link to={ROUTES.PRODUCT(product._id)}>{product.name}</Link>
        </h3>
        <p className="flex-1 text-sm text-stone-600">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold">{formatPrice(product.price)}</span>
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
