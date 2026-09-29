import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes/appRoutes";
import { ROUTES } from "./routes/paths";
import { CartProvider } from "./context/CartProvider";
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
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Navbar />

          <Routes>
            {appRoutes.map((route, idx) => (
              <Route key={idx} path={route.path} element={route.element} />
            ))}
            <Route path={ROUTES.PRODUCTS} element={<Products />} />
          </Routes>

          <Cart />
        </CartProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
