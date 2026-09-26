import { ErrorResponse } from "../../../core/errors/error-handler.js";
import User from "../../../core/models/User.js";
import { comparePassword, hashPassword } from "../../../shared/utils/hash.js";
import { createToken } from "../../../shared/utils/jwt.js";

export class AuthService {
  constructor() {}

  // OBTENER USUARIO POR EMAIL
  // ============================================================
  async getByEmail(email) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ErrorResponse("Credenciales incorrectas", 404);
    }
    return user;
  }

  // LOGIN
  // ============================================================
  async login(email, password) {
    const user = await this.getByEmail(email);

    // Validar contraseña
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

  // REGISTER
  // ============================================================
  async register(email, password, dni) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ErrorResponse("Usuario ya registrado", 409);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({ email, password: hashedPassword, dni });

    return createToken(newUser);
  }
}
