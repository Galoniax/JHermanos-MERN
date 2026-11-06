import { useContext } from 'react';
import { CartContext } from '../context/CartProvider';
import { useQuery } from '@tanstack/react-query';
import { getProductsByIds } from '@/services/product.api';

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart tiene que usarse dentro de <CartProvider>');
  }
  return context;
}

export function useCartProducts({ cart, count }) {
  const productIds = cart.map((item) => item.id);

  const product = useQuery({
    queryKey: ['cart', productIds],
    queryFn: async () => {
      const productIds = cart.map((item) => item.id);

      const response = await getProductsByIds(productIds);

      return response.data;
    },
    enabled: count > 0,
    staleTime: 30 * 60 * 1000,

    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,

    refetchInterval: 30 * 60 * 1000,
  });

  return product;
}
