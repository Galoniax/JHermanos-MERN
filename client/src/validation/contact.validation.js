const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values = {}) {
  const datos = {
    nombre: (values.nombre ?? "").trim(),
    email: (values.email ?? "").trim(),
    mensaje: (values.mensaje ?? "").trim(),
  };

  const errors = { nombre: "", email: "", mensaje: "" };

  if (datos.nombre === "") {
    errors.nombre = "Por favor, ingresá tu nombre.";
  } else if (datos.nombre.length < 3) {
    errors.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  if (datos.email === "") {
    errors.email = "Por favor, ingresá tu email.";
  } else if (!RE_EMAIL.test(datos.email)) {
    errors.email = "Ingresá un formato de email válido (ej: nombre@correo.com).";
  }

  if (datos.mensaje === "") {
    errors.mensaje = "Por favor, escribí tu mensaje.";
  } else if (datos.mensaje.length < 10) {
    errors.mensaje = "El mensaje debe tener al menos 10 caracteres.";
  }

  const valid = Object.values(errors).every((error) => error === "");

  return { valid, errors };
}
