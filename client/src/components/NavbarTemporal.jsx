import { Link } from "react-router-dom";
import { ROUTES } from "../routes/paths";

// Navbar TEMPORAL solo para que el contador del carrito se vea.
// Valentina: reemplazalo por tu Navbar definitivo cambiando el import en App.jsx.
// Tu Navbar tiene que recibir los props cartCount y onOpenCart.
export default function NavbarTemporal({ cartCount, onOpenCart }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
      <Link to={ROUTES.HOME} className="font-display text-xl text-stone-900">
        Hermanos Jota
      </Link>
      <nav className="flex items-center gap-6 font-inter text-sm">
        <Link to={ROUTES.HOME}>Inicio</Link>
        <Link to={ROUTES.PRODUCTS}>Productos</Link>
        <button
          type="button"
          onClick={onOpenCart}
          className="rounded-full bg-stone-900 px-4 py-2 text-white"
        >
          Carrito ({cartCount})
        </button>
      </nav>
    </header>
  );
}
