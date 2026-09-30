import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

// Uso: const { cart, cartCount, addToCart, openCart } = useCart();
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart tiene que usarse dentro de <CartProvider>");
  }
  return context;
}
