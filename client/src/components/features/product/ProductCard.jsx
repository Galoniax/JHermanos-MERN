import { ROUTES } from "@/routes/paths";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const isMultiple = product.image_url.length > 1;

  return (
    <article
      key={product.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}

      onClick={() => {
        navigate(ROUTES.PRODUCT(product._id));
      }}
      className="flex flex-col gap-2 cursor-pointer"
    >
      <div className="border border-pitch/10 overflow-hidden min-h-[420px]">
        <img
          src={
            isHovered && isMultiple
              ? product.image_url[1]
              : product.image_url[0]
          }
          alt={product.name}
        />
      </div>

      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="text-pitch text-base font-semibold">
            {product.name}
          </span>
          <span className="text-pitch/50 text-sm line-clamp-2 max-w-[90%]">
            {product.description}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          {product.discount > 0 && (
            <p className="text-pitch text-base font-semibold">
              ${product.finalPrice?.$numberDecimal || product.finalPrice}
            </p>
          )}

          <p
            className={`${product.discount > 0 ? "line-through text-gray-500" : "text-pitch text-base font-semibold"}`}
          >
            ${product.price?.$numberDecimal || product.price}
          </p>
        </div>
      </div>
    </article>
  );
}

// TODO: Cambiar a {formatPrice(product.finalPrice?.$numberDecimal || product.finalPrice)}