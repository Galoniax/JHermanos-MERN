import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { useQuery } from "@tanstack/react-query";
import { getProductsByIds } from "@/services/product.api";

// Uso: const { cart, cartCount } = useCart();
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart tiene que usarse dentro de <CartProvider>");
  }
  return context;
}

export function useCartProducts() {
  const { cart, cartCount } = useCart();

  const productIds = cart.map((item) => item.id);

  const product = useQuery({
    queryKey: ["cart", productIds],
    queryFn: async () => {
      try {
        const productIds = cart.map((item) => item.id);

        console.log("productIds: ", productIds);
        const response = await getProductsByIds(productIds);

        return response.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    enabled: cartCount > 0,
    staleTime: 30 * 60 * 1000,

    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    
    refetchInterval: 30 * 60 * 1000,
  });

  return product;
}
