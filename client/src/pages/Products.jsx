import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { useCart } from "../hooks/useCart";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/productos`);
        if (!response.ok) {
          throw new Error(`Error ${response.status} al cargar los productos`);
        }
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : (data.data ?? []));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 font-display text-4xl">Nuestros productos</h1>

      {loading && <p className="font-inter">Cargando productos...</p>}
      {error && <p className="font-inter text-red-600">{error}</p>}
      {!loading && !error && (
        <ProductList products={products} onAddToCart={addToCart} />
      )}
    </main>
  );
}
