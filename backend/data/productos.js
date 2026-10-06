import mongoose from "mongoose";

const CATEGORY_MOCK_ID = new mongoose.Types.ObjectId(
  "64d5ecb8b392d70012345678",
);

export const PRODUCTS = [
  {
    name: "Aparador Uspallata",
    description:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    price: 79.99,
    category: CATEGORY_MOCK_ID,
    metrics: {
      ancho: "120 cm",
      profundidad: "40 cm",
      alto: "80 cm",
      peso: "68 kg"
    },
    especifications: {
      materiales: "Nogal macizo FSC®, Herrajes de latón",
      acabado: "Aceite natural ecológico",
      capacidad: "6 compartimientos interiores",
    },
    stock: 15,
    image_url: ["./img/Aparador Uspallata.webp"],
    active: true,
  },
  {
    name: "Biblioteca Recoleta",
    description:
      "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
    price: 189.99,
    category: CATEGORY_MOCK_ID,
    metrics: {
      ancho: "100 cm",
      profundidad: "35 cm",
      alto: "200 cm",
      peso: "42 kg"
    },
    especifications: {
      materiales: "Estructura de acero, Estantes de roble",
      acabado: "Laca mate ecológica",
      capacidad: "45 kg por estante",
      modulares: "5 estantes ajustables",
    },
    stock: 8,
    image_url: ["./img/Biblioteca Recoleta.webp"],
    active: true,
  },
  {
    name: "Butaca Mendoza",
    description:
      "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
    price: 129.99,
    category: CATEGORY_MOCK_ID,
    metrics: {
      ancho: "80 cm",
      profundidad: "75 cm",
      alto: "85 cm",
      peso: "25 kg"
    },
    especifications: {
      materiales: "Guatambú macizo, Tela bouclé",
      acabado: "Cera vegetal, tapizado premium",
      tapizado: "Repelente al agua y manchas",
      confort: "Espuma alta densidad",
    },
    stock: 12,
    image_url: ["./img/Butaca Mendoza.webp"],
    active: true,
  },
  {
    name: "Sillón Copacabana",
    description:
      "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
    price: 219.99,
    category: CATEGORY_MOCK_ID,
    metrics: {
      ancho: "90 cm",
      profundidad: "85 cm",
      alto: "95 cm",
      peso: "30 kg"
    },
    especifications: {
      materiales: "Cuero curtido vegetal, Acero pintado",
      acabado: "Cuero anilina premium",
      rotacion: "360° silenciosa y suave",
      garantia: "10 años en estructura",
    },
    stock: 5,
    image_url: ["./img/Sillón Copacabana.webp"],
    active: true,
  },
  {
    name: "Mesa de Centro Araucaria",
    description:
      "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
    price: 99.99,
    category: CATEGORY_MOCK_ID,
    metrics: {
      ancho: "90 cm",
      profundidad: "90 cm",
      alto: "45 cm",
      peso: "42 kg"
    },
    especifications: {
      materiales: "Sobre de mármol Patagonia, Patas de nogal",
      acabado: "Mármol pulido, aceite natural en madera",
      cargaMaxima: "25 kg distribuidos",
    },
    stock: 10,
    image_url: ["./img/Mesa de Centro Araucaria.webp"],
    active: true,
  },
  {
    name: "Mesa de Noche Aconcagua",
    description:
      "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.",
    price: 64.99,
    category: CATEGORY_MOCK_ID,
    metrics: {
      ancho: "45 cm",
      profundidad: "35 cm",
      alto: "60 cm",
      peso: "20 kg"
    },
    especifications: {
      materiales: "Roble macizo FSC®, Herrajes soft-close",
      acabado: "Barniz mate de poliuretano",
      almacenamiento: "1 cajón + repisa inferior",
      caracteristicas: "Cajón con cierre suave",
    },
    stock: 20,
    image_url: ["./img/Mesa de Noche Aconcagua.webp"],
    active: true,
  },
  {
    name: "Sofá Patagonia",
    description:
      "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible para el hogar moderno.",
    price: 299.99,
    category: CATEGORY_MOCK_ID,
    metrics: {
      ancho: "220 cm",
      profundidad: "90 cm",
      alto: "80 cm",
      peso: "50 kg"
    },
    especifications: {
      materiales:
        "Madera de eucalipto certificada FSC®, Lino 100% natural premium, Espuma HR + plumón reciclado",
      tapizado: "Lino 100% natural premium",
      relleno: "Espuma HR + plumón reciclado",
      sostenibilidad: "Materiales 100% reciclables",
    },
    stock: 4,
    image_url: ["./img/Sofá Patagonia.webp"],
    active: true,
  },
  {
    name: "Mesa Comedor Pampa",
    description:
      "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.",
    price: 249.99,
    category: CATEGORY_MOCK_ID,
    metrics: {
      ancho: "160-240 cm",
      profundidad: "90 cm",
      alto: "75 cm",
      peso: "60 kg"
    },
    especifications: {
      materiales: "Roble macizo FSC®, Mecanismo alemán",
      acabado: "Aceite-cera natural",
      capacidad: "6-10 comensales",
      extension: "Sistema de mariposa central",
    },
    stock: 6,
    image_url: ["./img/Mesa Comedor Pampa.webp"],
    active: true,
  },
  {
    name: "Sillas Córdoba",
    description:
      "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.",
    price: 149.99,
    category: CATEGORY_MOCK_ID,
    metrics: {
      ancho: "45 cm",
      profundidad: "52 cm",
      alto: "80 cm",
      peso: "18 kg"
    },
    especifications: {
      materiales: "Contrachapado nogal, Tubo de acero",
      acabado: "Laca mate, pintura epoxi",
      apilables: "Hasta 6 sillas",
      incluye: "Set de 4 sillas",
    },
    stock: 18,
    image_url: ["./img/Sillas Córdoba.webp"],
    active: true,
  },
  {
    name: "Escritorio Costa",
    description:
      "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
    price: 179.99,
    category: CATEGORY_MOCK_ID,
    metrics: {
      ancho: "120 cm",
      profundidad: "60 cm",
      alto: "75 cm",
      peso: "25 kg"
    },
    especifications: {
      materiales: "Bambú laminado, Herrajes ocultos",
      acabado: "Laca mate resistente",
      almacenamiento: "1 cajón con organizador",
      cables: "Pasacables integrado",
    },
    stock: 7,
    image_url: ["./img/Escritorio Costa.webp"],
    active: true,
  },
  {
    name: "Silla de Trabajo Belgrano",
    description:
      "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
    price: 139.99,
    category: CATEGORY_MOCK_ID,
    metrics: {
      ancho: "60 cm",
      profundidad: "60 cm",
      alto: "90-100 cm",
      peso: "20 kg"
    },
    especifications: {
      materiales: "Malla técnica, Tejido reciclado",
      acabado: "Base cromada, tapizado premium",
      regulacion: "Altura + inclinación respaldo",
      certificacion: "Ergonomía europea EN 1335",
    },
    stock: 14,
    image_url: ["./img/Silla de Trabajo Belgrano.webp"],
    active: true,
  },
];
