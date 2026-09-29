import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/paths";

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PRODUCTS} onClick={closeMenu}>
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
                <a
                  href="/#contacto"
                  onClick={(e) => handleNavClick(e, "#contacto")}
                >
                  Contacto
                </a>
              </li>
            </ul>
          </nav>

          <div className="site-header__actions">
            <button
              type="button"
              id="btn-abrir-carrito"
              className="btn btn--cart"
              onClick={onOpenCart}
              aria-label={`Ver carrito con ${cartCount} productos`}
            >
              Carrito <span id="carrito-contador" className="cart-badge">{cartCount}</span>
            </button>

            <button
              type="button"
              id="menu-toggle"
              className={`menu-toggle ${isMenuOpen ? "menu-activo" : ""}`}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls="main-nav"
              onClick={toggleMenu}
            >
              <span className="menu-linea" aria-hidden="true"></span>
              <span className="menu-linea" aria-hidden="true"></span>
              <span className="menu-linea" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay de fondo para el menú móvil */}
      <div
        className={`menu-overlay ${isMenuOpen ? "is-visible" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
}
