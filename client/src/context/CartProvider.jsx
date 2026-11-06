import { ToastComponent } from '@/components/ui/feedback/ToastComponent';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

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
    const currentTotal = cart.reduce((total, item) => total + item.cantidad, 0);

    if (currentTotal >= 50 && delta === 1) {
      toast.error(
        <ToastComponent
          message="Límite de 50 productos alcanzado"
          type="error"
          closeToast={() => toast.dismiss()}
        />
      );
      return;
    }

    const existing = cart.find((item) => item.id === product._id);

    if (existing && delta === 1 && existing.cantidad >= product.stock) {
      toast.error(
        <ToastComponent
          message="Límite de stock alcanzado"
          type="error"
          closeToast={() => toast.dismiss()}
        />
      );
      return;
    }

    setCart((prev) => {
      const itemExists = prev.find((item) => item.id === product._id);
      if (itemExists) {
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
        isOpen,
        setIsOpen,
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
