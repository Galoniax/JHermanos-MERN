import { Link } from "react-router-dom";
import { ROUTES } from "../routes/paths";

const DESTACADOS = [
  {
    id: 1,
    nombre: "Sillón Copacabana",
    descripcion:
      "Estructura en madera maciza de petiribí con tapizado en lino natural. Inspirado en el diseño moderno brasileño de los años 50.",
    precio: "$310.000",
    imagen: "/img/sillon_copacabana.webp",
  },
  {
    id: 2,
    nombre: "Mesa Comedor Pampa",
    descripcion:
      "Tablero continuo en lenga fueguina con uniones en cola de milano visibles. Acabado al aceite natural que resalta su veta única.",
    precio: "$420.000",
    imagen: "/img/mesa_comedor_pampa.webp",
  },
  {
    id: 3,
    nombre: "Aparador Uspallata",
    descripcion:
      "Tres cuerpos en roble criollo con puertas corredizas ranuradas y herrajes ocultos de latón macizo.",
    precio: "$380.000",
    imagen: "/img/aparador_uspallata.webp",
  },
];

export default function Home() {
  return (
    <>
      {/* 1. Hero Banner */}
      <section className="hero-banner" aria-labelledby="hero-titulo">
        <div className="hero-texto">
          <p className="eyebrow">Taller de mobiliario · Buenos Aires</p>
          <h1 id="hero-titulo">El redescubrimiento de un arte olvidado.</h1>
          <p className="hero__lead">
            Creamos muebles que no solo sirven una función, sino que alimentan el
            alma. Existimos en la intersección entre herencia e innovación, donde
            la calidez del optimismo de los años 60 se encuentra con la
            conciencia de la sustentabilidad de 2026.
          </p>
          <Link className="btn btn--primary" to={ROUTES.PRODUCTS}>
            Ver el catálogo
          </Link>
        </div>
        <div className="hero-imagen">
          <img
            src="/img/sillon_copacabana.webp"
            alt="Sillón Copacabana - Diseño icónico de Hermanos Jota"
            loading="eager"
          />
        </div>
      </section>

      {/* Divisor ensamble característico */}
      <div className="joint-divider" role="presentation" aria-hidden="true">
        <svg viewBox="0 0 240 16" preserveAspectRatio="none">
          <path d="M0,8 L20,8 L26,1 L38,1 L44,8 L64,8 L70,1 L82,1 L88,8 L108,8 L114,1 L126,1 L132,8 L152,8 L158,1 L170,1 L176,8 L196,8 L202,1 L214,1 L220,8 L240,8" />
        </svg>
      </div>

      {/* 2. Productos Destacados */}
      <section className="productos-destacados" aria-labelledby="destacados-titulo">
        <div className="wrap">
          <p className="eyebrow">Selección Especial</p>
          <h2 id="destacados-titulo" className="section-title">
            Productos Destacados
          </h2>
          <p className="subtitulo-seccion">
            Selección de nuestras creaciones más emblemáticas
          </p>

          <div className="grilla-productos">
            {DESTACADOS.map((item) => (
              <article key={item.id} className="producto-card">
                <img src={item.imagen} alt={item.nombre} loading="lazy" />
                <div className="producto-info">
                  <h3>{item.nombre}</h3>
                  <p className="descripcion-breve">{item.descripcion}</p>
                  <p className="precio">{item.precio}</p>
                  <Link
                    to={ROUTES.PRODUCT ? ROUTES.PRODUCT(item.id) : ROUTES.PRODUCTS}
                    className="btn btn--ghost mt-auto text-center"
                  >
                    Ver detalle
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Filosofía / Viaje Emocional */}
      <section className="journey" id="filosofia" aria-labelledby="journey-titulo">
        <div className="wrap">
          <p className="eyebrow">Nuestra Esencia</p>
          <h2 id="journey-titulo" className="section-title">
            Un viaje emocional, pieza a pieza
          </h2>
          <div className="journey__grid">
            <article className="journey__stage">
              <p className="journey__stage-name">Primera impresión</p>
              <p>
                Una sensación de calidez y nostalgia te envuelve, como descubrir
                un tesoro familiar en perfectas condiciones. Hay un
                reconocimiento inmediato de calidad e intencionalidad.
              </p>
            </article>
            <article className="journey__stage">
              <p className="journey__stage-name">Conexión más profunda</p>
              <p>
                Al explorar más, descubrís los detalles pensados: los materiales
                sustentables, los principios de diseño atemporal, la historia
                detrás de cada pieza. Esto no es solo mobiliario, es una
                filosofía de vida.
              </p>
            </article>
            <article className="journey__stage">
              <p className="journey__stage-name">Impacto duradero</p>
              <p>
                Vivir con Hermanos Jota se convierte en parte de tu ritual diario.
                Cada pieza envejece con gracia, desarrollando carácter mientras
                mantiene su belleza esencial.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Teaser Catálogo */}
      <section className="catalog-teaser" aria-labelledby="teaser-titulo">
        <div className="wrap catalog-teaser__inner">
          <p className="eyebrow">Colección completa</p>
          <h2 id="teaser-titulo" className="section-title">
            Descubrí todo el catálogo
          </h2>
          <p className="hero__lead">
            Mesas, sillas, sofás y más piezas artesanales certificadas FSC®,
            listas para sumarse a tu hogar.
          </p>
          <Link className="btn btn--primary" to={ROUTES.PRODUCTS}>
            Ver catálogo completo
          </Link>
        </div>
      </section>

      {/* 5. Sustentabilidad */}
      <section
        className="sustentabilidad"
        id="sustentabilidad"
        aria-labelledby="sust-titulo"
      >
        <div className="wrap sustentabilidad__inner">
          <p className="eyebrow">Herencia Viva</p>
          <h2 id="sust-titulo" className="section-title section-title--inverted">
            Madera certificada, compromiso de por vida
          </h2>
          <ul className="sust-list">
            <li>Madera certificada FSC® de bosques responsables argentinos</li>
            <li>Prioridad a maderas nativas: algarrobo, quebracho, caldén</li>
            <li>
              Garantía extendida: 10 años en estructura, 5 años en acabados
            </li>
            <li>
              Recompra garantizada: hasta 40% del valor en piezas bien cuidadas
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
