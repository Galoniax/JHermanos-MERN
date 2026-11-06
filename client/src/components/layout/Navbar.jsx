import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { OUT_AUTH, ROUTES } from '../../routes/paths';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import Cart from '../modal/Cart';

import { FiShoppingBag } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';

import { AnimatePresence, motion } from 'framer-motion';

import avatar from '@/assets/images/DefaultProfile.png';

const NavUl = ({ closeMenu }) => (
  <ul>
    <li>
      <NavLink
        to={ROUTES.HOME}
        onClick={closeMenu}
        className="hover:underline underline-offset-4"
      >
        {({ isActive }) => (
          <span className={isActive ? 'text-bordeau underline' : ''}>
            Inicio
          </span>
        )}
      </NavLink>
    </li>
    <li>
      <NavLink
        to={ROUTES.PRODUCTS}
        onClick={closeMenu}
        className="hover:underline underline-offset-4"
      >
        {({ isActive }) => (
          <span className={isActive ? 'text-bordeau underline' : ''}>
            Catálogo
          </span>
        )}
      </NavLink>
    </li>

    <li>
      <NavLink
        to={ROUTES.CONTACT}
        onClick={closeMenu}
        className="hover:underline underline-offset-4"
      >
        {({ isActive }) => (
          <span className={isActive ? 'text-bordeau underline' : ''}>
            Contacto
          </span>
        )}
      </NavLink>
    </li>
  </ul>
);

export default function Navbar() {
  const { cartCount, isOpen, setIsOpen } = useCart();
  const { isAuthenticated, user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (OUT_AUTH.includes(location.pathname)) {
    return null;
  }

  const carousel = [
    '10 años de garantía en estructura',
    'Maderas nativas certificadas FSC',
    'Cero plásticos de un solo uso',
    'Hecho a mano en Gran Buenos Aires',
    'Programa herencia viva',
    '5 años de garantía en acabado',
  ];

  const duplicated = [...carousel, ...carousel, ...carousel];

  return (
    <>
      {/** Infinite div */}
      <div className="w-full overflow-hidden bg-pitch/95 py-2.5 flex">
        <motion.div
          className="flex w-max"
          animate={{
            x: '-50%',
          }}
          transition={{
            ease: 'linear',
            duration: 80,
            repeat: Infinity,
          }}
        >
          {duplicated.map((item, idx) => (
            <div key={idx} className="flex items-center px-8 gap-10">
              <img
                src="/img/logo.png"
                alt="Hermanos Jota"
                style={{ height: '18px', width: 'auto' }}
              />

              <p className="whitespace-nowrap font-semibold uppercase text-[10px] tracking-widest text-parch/80">
                {item}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <header className="relative sticky top-0 z-50 flex flex-row justify-between items-center w-full *:flex-1 tracking-wide bg-parch py-2.5 px-6 md:px-14 border-b border-pitch/15 text-pitch/60 shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
        {/** Desktop navigation */}
        <nav
          className="*:flex flex-row items-center *:gap-8 uppercase text-[11px] font-bold hidden md:flex"
          aria-label="Navegación principal"
        >
          <NavUl key="desktop-nav" closeMenu={closeMenu} />
        </nav>

        <div className="flex flex-row md:justify-center">
          <Link
            to={ROUTES.HOME}
            aria-label="Página de inicio"
            className="w-10 h-10"
          >
            <img
              src="/img/logo.png"
              alt="Hermanos Jota"
              className="h-full w-full shrink-0 object-contain"
            />
          </Link>
        </div>

        <div className="flex flex-row justify-end items-center gap-3 md:gap-5">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={`Ver carrito con ${cartCount} productos`}
            className="cursor-pointer flex items-center gap-2 hover:text-bordeau transition-colors duration-200"
          >
            <FiShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="bg-bordeau rounded-full ring ring-parch/80 text-parch text-[10px] w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/** Exclusivo para desktop */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <Link to={ROUTES.PROFILE} className="cursor-pointer">
                <div className="w-8 h-8 rounded-full overflow-hidden ring ring-pitch/40">
                  <img src={user?.avatar_url || avatar} alt="Usuario" />
                </div>
              </Link>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="cursor-pointer font-medium text-[13px] border border-pitch/10 hover:border-pitch/20 py-1 px-4 transition-colors duration-300"
              >
                <span>Iniciar Sesión</span>
              </Link>
            )}
          </div>

          <button
            type="button"
            className="md:hidden cursor-pointer hover:text-bordeau transition-colors duration-200"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <RxHamburgerMenu size={22} />
          </button>
        </div>

        {/** Menú mobile */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.nav
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{
                height: 0,
              }}
              transition={{
                ease: 'linear',
                duration: 0.1,
              }}
              
              
              className="flex flex-col gap-5 **:items-center absolute top-full left-0 right-0 z-50 bg-parch md:hidden py-4 uppercase text-[11px] font-bold overflow-hidden border-b border-dotted border-pitch/20 shadow-[0_2px_5px_rgba(0,0,0,0.1)]"
              aria-label="Navegación móvil"
            >
              <div className="*:flex *:gap-5 *:flex-col">
                <NavUl key="mobile-nav" closeMenu={closeMenu} />
              </div>

              {isAuthenticated ? (
                <Link
                  to={ROUTES.PROFILE}
                  onClick={closeMenu}
                  className="cursor-pointer flex flex-row justify-center gap-3 hover:underline underline-offset-4"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden ring ring-pitch/40">
                    <img
                      src={user?.avatar_url || avatar}
                      className="w-full h-full object-cover"
                      alt="Usuario"
                    />
                  </div>
                  <p>Perfil</p>
                </Link>
              ) : (
                <Link
                  to={ROUTES.LOGIN}
                  className="cursor-pointer font-medium text-[13px] border border-pitch/10 hover:border-pitch/20 py-1 px-4 transition-colors duration-300"
                >
                  <span>Iniciar Sesión</span>
                </Link>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {isOpen && <Cart />}
    </>
  );
}
