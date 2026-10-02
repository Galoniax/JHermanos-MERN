import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import Cart from "../Cart";

export default function Navbar() {
  const { cartCount, openCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-bloqueado");
    } else {
      document.body.classList.remove("menu-bloqueado");
    }
    return () => {
      document.body.classList.remove("menu-bloqueado");
    };
  }, [isMenuOpen]);

  // Handle smooth scroll for anchor links if on home page
  const handleNavClick = (e, targetHash) => {
    closeMenu();
    if (location.pathname === "/" && targetHash) {
      e.preventDefault();
      const el = document.querySelector(targetHash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isAuthPage =
    location.pathname === ROUTES.LOGIN ||
    location.pathname === ROUTES.REGISTER;

  return (
    <>
      <header className="site-header">
        <div className="wrap site-header__inner">
          <Link
            to={ROUTES.HOME}
            className="logo-link"
            onClick={(e) => handleNavClick(e, "#inicio")}
          >
            <img
              src="/img/logo.svg"
              alt="Hermanos Jota"
              style={{ height: "40px", width: "auto" }}
            />
          </Link>

          <nav
            id="main-nav"
            className={`main-nav ${isMenuOpen ? "nav-abierto" : ""}`}
            aria-label="Navegación principal"
          >
            <ul>
              <li>
                <Link
                  to={ROUTES.HOME}
                  onClick={(e) => handleNavClick(e, "#inicio")}
                  className={location.pathname === ROUTES.HOME ? "active-link" : ""}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.PRODUCTS}
                  onClick={closeMenu}
                  className={
                    location.pathname === ROUTES.PRODUCTS ||
                    location.pathname.startsWith("/product")
                      ? "active-link"
                      : ""
                  }
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <a
                  href="/#filosofia"
                  onClick={(e) => handleNavClick(e, "#filosofia")}
                >
                  Filosofía
                </a>
              </li>
              <li>
                <a
                  href="/#sustentabilidad"
                  onClick={(e) => handleNavClick(e, "#sustentabilidad")}
                >
                  Sustentabilidad
                </a>
              </li>
              <li>
                <Link
                  to={ROUTES.CONTACT}
                  onClick={closeMenu}
                  className={
                    location.pathname === ROUTES.CONTACT ||
                    location.pathname === ROUTES.CONTACT_ALT
                      ? "active-link"
                      : ""
                  }
                >
                  Contacto
                </Link>
              </li>
              <li className="mobile-only-auth">
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="w-full text-left font-medium text-red-600 py-2 cursor-pointer"
                  >
                    Cerrar sesión ({user?.nombre || user?.email?.split("@")[0]})
                  </button>
                ) : (
                  <Link
                    to={ROUTES.LOGIN}
                    onClick={closeMenu}
                    className={isAuthPage ? "active-link" : ""}
                  >
                    Iniciar sesión
                  </Link>
                )}
              </li>
            </ul>
          </nav>

          <div className="site-header__actions">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span
                  className="hidden sm:inline-block text-xs font-medium text-stone-700 max-w-[120px] truncate"
                  title={user?.email || "Usuario"}
                >
                  {user?.nombre || user?.email?.split("@")[0]}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="btn btn--auth text-xs py-1.5 px-3 cursor-pointer"
                  aria-label="Cerrar sesión"
                  title="Cerrar sesión"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                id="btn-login"
                className={`btn btn--auth ${isAuthPage ? "is-active" : ""}`}
                aria-label="Iniciar sesión"
                onClick={closeMenu}
              >
                <svg
                  className="btn-icon"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Ingresar</span>
              </Link>
            )}

            <button
              type="button"
              id="btn-abrir-carrito"
              className="btn btn--cart"
              onClick={openCart}
              aria-label={`Ver carrito con ${cartCount} productos`}
            >
              Carrito{" "}
              <span id="carrito-contador" className="cart-badge">
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              id="menu-toggle"
              className={`menu-toggle ${isMenuOpen ? "menu-activo" : ""}`}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls="main-nav"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span className="menu-linea" aria-hidden="true"></span>
              <span className="menu-linea" aria-hidden="true"></span>
              <span className="menu-linea" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </header>

      <Cart />

      {/* Overlay de fondo para el menú móvil */}
      <div
        className={`menu-overlay ${isMenuOpen ? "is-visible" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
}
