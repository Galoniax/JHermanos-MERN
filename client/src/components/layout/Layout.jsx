import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ cartCount = 0, onOpenCart, children }) {
  return (
    <div className="layout-wrapper flex flex-col min-h-screen bg-[var(--superficie)] text-[var(--tinta)]">
      <Navbar cartCount={cartCount} onOpenCart={onOpenCart} />
      <main id="inicio" className="flex-grow">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
