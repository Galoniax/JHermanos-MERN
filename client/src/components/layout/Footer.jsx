export default function Footer() {
  return (
    <footer className="site-footer" id="contacto">
      <div className="wrap site-footer__inner">
        <div className="site-footer__block">
          <p className="wordmark wordmark--footer">
            Hermanos <span>Jota</span>
          </p>
          <address>
            Av. San Juan 2847, Barrio de San Cristóbal<br />
            C1232AAB — Ciudad Autónoma de Buenos Aires, Argentina
          </address>
          <p>Lunes a Viernes 10:00–19:00 · Sábados 10:00–14:00</p>
        </div>

        <div className="site-footer__block">
          <h2 className="site-footer__heading">Contacto</h2>
          <ul className="footer-contact-list">
            <li>
              <a href="mailto:info@hermanosjota.com.ar">
                info@hermanosjota.com.ar
              </a>
            </li>
            <li>
              <a href="mailto:ventas@hermanosjota.com.ar">
                ventas@hermanosjota.com.ar
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5491145678900"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp +54 11 4567-8900
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/hermanosjota_ba"
                target="_blank"
                rel="noopener noreferrer"
              >
                @hermanosjota_ba
              </a>
            </li>
            <li>
              <a href="https://www.hermanosjota.com.ar">
                www.hermanosjota.com.ar
              </a>
            </li>
          </ul>
        </div>

        <p className="site-footer__copy col-span-full">
          Hermanos Jota — © {new Date().getFullYear()}. Casa Taller, Buenos Aires.
        </p>
      </div>
    </footer>
  );
}
