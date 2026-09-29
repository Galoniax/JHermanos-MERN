import ProductCard from "./ProductCard";

export default function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return <p className="font-inter text-stone-600">No hay productos para mostrar.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
