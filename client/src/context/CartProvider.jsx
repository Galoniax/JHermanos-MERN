import { createContext, useEffect, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error al leer el carrito de localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const changeQuantity = (product, delta) => {
    console.log(product, delta);
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product._id);

      //TODO: Toast
      if (
        prev.reduce((total, item) => total + item.cantidad, 0) >= 40 &&
        delta === 1
      ) {
        console.log('Limite de 40 productos alcanzado');
        return prev;
      }

      if (existing) {
        return prev
          .map((item) =>
            item.id === product._id
              ? { ...item, cantidad: item.cantidad + delta }
              : item
          )
          .filter((item) => item.cantidad > 0);
      }

      return [
        ...prev,
        {
          id: product._id,
          image_url: product.image_url[0],
          name: product.name,
          cantidad: delta,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        changeQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
