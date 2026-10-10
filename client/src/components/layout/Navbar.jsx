import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { OUT_AUTH, ROUTES } from "../../routes/paths";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import Cart from "../modal/Cart";

import { LuUserRound } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { LuHeart } from "react-icons/lu";

import { motion } from "framer-motion";

export default function Navbar() {
  const { cartCount } = useCart();
  const { isAuthenticated } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const location = useLocation();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (OUT_AUTH.includes(location.pathname)) {
    return null;
  }

  const carousel = [
    "10 años de garantía en estructura",
    "Maderas nativas certificadas FSC",
    "Cero plásticos de un solo uso",
    "Hecho a mano en Gran Buenos Aires",
    "Programa herencia viva",
    "5 años de garantía en acabado",
  ];

  const duplicated = [...carousel, ...carousel, ...carousel];

  return (
    <>
      <div className="w-full overflow-hidden bg-pitch/95 py-2.5 flex">
        <motion.div
          className="flex w-max"
          animate={{
            x: "-50%",
          }}
          transition={{
            ease: "linear",
            duration: 80,
            repeat: Infinity,
          }}
        >
          {duplicated.map((item, idx) => (
            <div key={idx} className="flex items-center px-8 gap-10">
              <img
                src="/img/logo.png"
                alt="Hermanos Jota"
                style={{ height: "18px", width: "auto" }}
              />

              <p className="whitespace-nowrap font-semibold uppercase text-[10px] tracking-widest text-parch/80">
                {item}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
      <header className="sticky top-0 z-50 flex flex-row justify-between items-center w-full *:flex-1 tracking-wide bg-parch py-2.5 px-14 border-b border-pitch/15 text-pitch/60">
        <nav
          className="*:flex flex-row items-center *:gap-8 uppercase text-[11px] font-bold"
          aria-label="Navegación principal"
        >
          <ul>
            <li>
              <Link
                to={ROUTES.HOME}
                onClick={closeMenu}
                className="hover:underline underline-offset-5"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.PRODUCTS}
                onClick={closeMenu}
                className="hover:underline underline-offset-5"
              >
                Catálogo
              </Link>
            </li>

            <li>
              <Link
                to={ROUTES.CONTACT}
                onClick={closeMenu}
                className="hover:underline underline-offset-5"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-row justify-center">
          <Link
            to={ROUTES.HOME}
            className={location.pathname === ROUTES.HOME ? "active-link" : ""}
          >
            <img
              src="/img/logo.png"
              alt="Hermanos Jota"
              style={{
                height: "40px",
                width: "auto",
              }}
            />
          </Link>
        </div>

        <div className="flex flex-row justify-end items-center gap-5">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Ver carrito con ${cartCount} productos`}
            className="cursor-pointer flex items-center gap-2"
          >
            <FiShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="bg-bordeau rounded-full ring ring-parch/80 text-parch text-[10px] w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            aria-label={`Ver carrito con ${cartCount} productos`}
            className="cursor-pointer"
          >
            <LuHeart size={18} />
          </button>

          {isAuthenticated ? (
            <Link to={ROUTES.PROFILE} className="cursor-pointer">
              <LuUserRound size={18} />
            </Link>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="cursor-pointer font-medium text-[13px] border border-pitch/10 hover:border-pitch/20 py-1 px-4 transition-colors duration-300"
            >
              <span>Iniciar Sesión</span>
            </Link>
          )}

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
      </header>

      {isCartOpen && (
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}

      {/* Overlay de fondo para el menú móvil */}
      <div
        className={`menu-overlay ${isMenuOpen ? "is-visible" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
}
