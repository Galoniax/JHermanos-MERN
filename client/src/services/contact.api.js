import { interceptor } from "../api/interceptor/axios-interceptor";

// Envío del formulario de contacto al backend (/api/contact)
export const sendContact = async (payload) => {
  return await interceptor.post("/contact", payload);
};
