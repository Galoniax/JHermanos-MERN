import { Link, useLocation } from 'react-router-dom';
import { OUT_AUTH, ROUTES } from '../../routes/paths';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';

export default function Footer() {
  const location = useLocation();

  if (OUT_AUTH.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="bg-parch text-pitch/60">
      <div className="max-w-[90%] mx-auto pt-16 pb-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between">
          <div className="flex flex-col items-start">
            <Link to={ROUTES.HOME}>
              <img
                src="/img/logo.png"
                alt="Logo J. Hermanos"
                style={{ height: '60px', width: 'auto' }}
              />
            </Link>
            <p className="mt-5 text-sm leading-relaxed max-w-[80%] lg:max-w-[50%]">
              Muebles de autor hechos a mano en el Gran Buenos Aires. Maderas
              nativas, sin plásticos, con garantía de por vida en estructura.
            </p>
          </div>

          {/* Columnas de links */}
          <div className="flex flex-wrap gap-8 md:gap-12 lg:gap-20 [&_a]:hover:underline [&_a]:decoration-pitch/20 underline-offset-4 transition-colors duration-200">
            <div>
              <p className="uppercase text-[10px] font-bold tracking-[0.12em] text-pitch/60 mb-4">
                Tienda
              </p>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li>
                  <Link
                    to={ROUTES.PRODUCTS}
                    className="hover:text-pitch transition-colors duration-200"
                  >
                    Todos los productos
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTES.PRODUCTS}
                    className="hover:text-pitch transition-colors duration-200"
                  >
                    Sillas
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTES.PRODUCTS}
                    className="hover:text-pitch transition-colors duration-200"
                  >
                    Mesas
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTES.PRODUCTS}
                    className="hover:text-pitch transition-colors duration-200"
                  >
                    Estantes
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nosotros */}
            <div>
              <p className="uppercase text-[10px] font-bold tracking-[0.12em] text-pitch/60 mb-4">
                Nosotros
              </p>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li>
                  <Link
                    to="/"
                    className="hover:text-pitch transition-colors duration-200"
                  >
                    Historia
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTES.CONTACT}
                    className="hover:text-pitch transition-colors duration-200"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="uppercase text-[10px] font-bold tracking-[0.12em] text-pitch/60 mb-4">
                Contacto
              </p>
              <div className="flex flex-col gap-2.5 text-sm">
                <address>
                  Av. San Juan 2847, Barrio de San Cristóbal
                  <br />
                  C1232AAB — Ciudad Autónoma de Buenos Aires, Argentina
                </address>

                <p>Lunes a Viernes 10:00–19:00 · Sábados 10:00–14:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-pitch/5">
        <div className="max-w-[90%] mx-auto py-3 flex flex-col sm:flex-row justify-between items-center gap-3 text-bordeau">
          <small>
            © {new Date().getFullYear()} J. Hermanos. Todos los derechos
            reservados.
          </small>
          <div className="flex items-center gap-6 *:p-1.5 *:rounded-full">
            <a
              href="https://wa.me/+541145678900?text=Hola%20J%20Hermanos%2C%20quisiera%20hacer%20un%20pedido%20de%20sus%20productos"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Whatsapp de J. Hermanos"
            >
              <FaWhatsapp size={20} />
            </a>
            <a
              href="https://instagram.com/hermanosjota_ba"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de J. Hermanos"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="mailto:info@hermanosjota.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="E-mail de J. Hermanos"
            >
              <BiLogoGmail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
