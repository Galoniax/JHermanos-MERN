import { ErrorResponse } from "../../../core/errors/error-handler.js";
import User from "../../../core/models/User.js";
import { comparePassword, hashPassword } from "../../../shared/utils/hash.js";
import { createToken, verifyToken } from "../../../shared/utils/jwt.js";

export class AuthService {
  async getByEmail(email) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ErrorResponse("Credenciales incorrectas", 404);
    }
    return user;
  }

  async login(email, password) {
    const user = await this.getByEmail(email);

    const passwordMatch = user.password
      ? await comparePassword(password, user.password)
      : false;

    if (!passwordMatch) {
      throw new ErrorResponse("Credenciales incorrectas", 401);
    }

    if (!user.active) {
      throw new ErrorResponse("Usuario inactivo", 403);
    }

    return createToken(user);
  }

  async register(user, token) {
    try {
      let decoded = null;
      let hashedPassword = null;

      if (token) {
        decoded = verifyToken(token);
      } else {
        if (!user.password) {
          throw new ErrorResponse("La contraseña es requerida", 400);
        }
        hashedPassword = await hashPassword(user.password);
      }

      const email = user.email || decoded?.email;

      if (!email) {
        throw new ErrorResponse("El email es requerido para el registro", 400);
      }

      const existing = await User.findOne({ email });

      if (existing) {
        throw new ErrorResponse("El usuario ya se encuentra registrado", 409);
      }

      const newUser = await User.create({
        email: email,
        password: token ? null : hashedPassword,
        avatar_url: token ? decoded?.avatar_url : null,
        dni: user.dni,
        phone: user.phone,
        provider: token ? decoded?.provider || "GOOGLE" : "LOCAL",
      });

      return {
        user: newUser,
        token: createToken(newUser),
      };
    } catch (error) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern || error.keyValue)[0];

        const messages = {
          email: "El email ya se encuentra registrado",
          dni: "El DNI ya se encuentra registrado",
        };

        const customMessage =
          messages[field] || `El campo ${field} ya está en uso`;

        throw new ErrorResponse(customMessage, 409);
      }

      throw error;
    }
  }
}
