import "./App.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes/appRoutes";
import { ROUTES } from "./routes/paths";
// Valentina: cuando tengas el Navbar definitivo, cambiá esta línea por el tuyo
import Navbar from "./components/NavbarTemporal";
import Cart from "./components/Cart";
import Products from "./pages/Products";

// TankStack Query Client Setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function App() {
  // Estado del carrito: vive acá (lifting state up) y se pasa por props
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product, cantidad = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item,
        );
      }
      return [...prev, { ...product, cantidad }];
    });
  };

  const changeQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + delta } : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Navbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

        <Routes>
          {appRoutes.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
          <Route
            path={ROUTES.PRODUCTS}
            element={<Products onAddToCart={addToCart} />}
          />
        </Routes>

        <Cart
          open={cartOpen}
          items={cart}
          onClose={() => setCartOpen(false)}
          onChangeQuantity={changeQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
