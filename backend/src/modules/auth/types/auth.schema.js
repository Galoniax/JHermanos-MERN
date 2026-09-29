import { z } from "zod";


export const authSchema = z.object({
  email: z.email("Formato de email inválido"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
});
