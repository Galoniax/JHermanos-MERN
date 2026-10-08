import { LuTruck, LuRotateCcw, LuShieldCheck, LuLeaf } from "react-icons/lu";

const FEATURES = [
  {
    icon: LuTruck,
    title: "Envío gratis en compras > €200",
    description: "Carbono neutral, con seguimiento y entregado en tu hogar en 3 días hábiles.",
  },
  {
    icon: LuRotateCcw,
    title: "Devoluciones a 30 días",
    description: "Sin uso, con etiquetas y 100% gratuito. Sin formularios ni complicaciones.",
  },
  {
    icon: LuShieldCheck,
    title: "Dos años de reparación gratis",
    description: "Costuras, herrajes, uniones y acabados reparados por los mismos artesanos.",
  },
  {
    icon: LuLeaf,
    title: "Materiales trazables",
    description: "Origen transparente de cada madera, tela y cuero especificado en cada producto.",
  },
];

export default function FeaturesBar() {
  return (
    <section className="bg-pitch text-parch py-14 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="flex flex-col items-start gap-3">
                <div className="text-parch p-1">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="text-sm font-semibold text-parch tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-xs text-parch/65 font-normal leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Separador inferior sutil */}
        <div className="w-full border-b border-parch/15 mt-12" />
      </div>
    </section>
  );
}
