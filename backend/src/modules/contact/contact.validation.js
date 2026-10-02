import { z } from "zod";

const nombreCampo = z.string().trim().superRefine((valor, ctx) => {
  const v = valor.trim();
  if (v === "") {
    ctx.addIssue({
      code: "custom",
      message: "Por favor, ingresá tu nombre.",
    });
  } else if (v.length < 3) {
    ctx.addIssue({
      code: "custom",
      message: "El nombre debe tener al menos 3 caracteres.",
    });
  }
});

const emailCampo = z.string().trim().superRefine((valor, ctx) => {
  const v = valor.trim();
  if (v === "") {
    ctx.addIssue({
      code: "custom",
      message: "Por favor, ingresá tu email.",
    });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
    ctx.addIssue({
      code: "custom",
      message: "Ingresá un formato de email válido (ej: nombre@correo.com).",
    });
  }
});

const mensajeCampo = z.string().trim().superRefine((valor, ctx) => {
  const v = valor.trim();
  if (v === "") {
    ctx.addIssue({
      code: "custom",
      message: "Por favor, escribí tu mensaje.",
    });
  } else if (v.length < 10) {
    ctx.addIssue({
      code: "custom",
      message: "El mensaje debe tener al menos 10 caracteres.",
    });
  }
});

export const contactSchema = z.object({
  nombre: nombreCampo,
  email: emailCampo,
  mensaje: mensajeCampo,
});
