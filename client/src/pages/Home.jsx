import { Link } from "react-router-dom";
import { ROUTES } from "../routes/paths";
import FeaturesBar from "../components/features/home/FeaturesBar";

const stats = [
  { value: 10, label: "Años de garantía en estructura" },
  { value: 5, label: "Años de garantía en acabado" },
  { value: "40%", label: "del valor en piezas bien cuidadas" },
  { value: "30%", label: "mínimo de materiales reciclados" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative h-[90vh] text-center p-8">
        <div className="absolute inset-0 bg-black/60 z-1" />

        {/* IMAGEN DE FONDO */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/img/4787421-interior-2685521.jpg"
            alt="Mesa Ratona Organic, madera maciza, diseño artesanal"
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
            loading="eager"
            aria-hidden="true"
          />
        </div>

        <div className="relative h-full w-full flex flex-col items-center justify-center z-10 gap-4">
          <div className="w-14 h-[1px] border-parch border-t" />
          <p className="text-xs font-medium text-parch uppercase tracking-widest">
            Muebles acogedores
          </p>
          <h1 className="text-[64px] md:text-[98px] font-semibold uppercase text-parch tracking-tighter leading-[1.1em]">
            Hechos para durar
          </h1>
          <p className="text-base text-parch/80 max-w-xl font-normal px-4">
            Sofás, mesas y estanterías creadas con un compromiso con la calidad.
            Piezas que formarán parte de tu hogar durante generaciones.
          </p>
        </div>
      </section>

      {/* 3. Bar de características / Beneficios de compra */}
      <FeaturesBar />

      <section className="px-6 py-18 bg-[var(--parch)]">
        <div className="flex flex-col gap-10 lg:gap-20">
          <div className="flex items-end flex-wrap justify-between gap-4">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase text-[var(--gray)]/50 border-b border-[var(--gray)]/30 pb-2">
                / Hablemos de números
              </p>

              <h2 className="text-5xl md:text-6xl font-medium text-[var(--pitch)]">
                Pequeño estudio. Grandes números
              </h2>
            </div>

            <p className="text-base md:text-xl font-normal text-gray/50 max-w-xl text-start lg:text-end">
              Nosotros construimos muebles de la manera correcta. Muebles que
              duran, con madera maciza y detalles que importan para que puedas
              disfrutarlo durante años.
            </p>
          </div>

          <div className="grid lg:justify-items-center gap-6 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-start gap-2">
                <span className="text-6xl lg:text-8xl font-bold text-peach tabular-nums">
                  {stat.value}
                </span>
                <p className="text-peach text-xs max-w-40 font-semibold uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
