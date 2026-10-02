import { NODE_ENV } from "../../../core/config/config.js";
import { ErrorResponse } from "../../../core/errors/error-handler.js";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  constructor(authService = new AuthService()) {
    this.authService = authService;
  }

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const token = await this.authService.login(email, password);

      const cookieAge = 24 * 60 * 60 * 1000; // 1 Día
      const isProduction = NODE_ENV === "production";

      const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: cookieAge,
        path: "/",
      };

      return res.cookie("accessToken", token, cookieOptions).status(200).json({
        success: true,
        message: "Login exitoso",
      });
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const { user, token } = req.body;

      const response = await this.authService.register(user, token);

      const cookieAge = 24 * 60 * 60 * 1000; // 1 Día
      const isProduction = NODE_ENV === "production";

      const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: cookieAge,
        path: "/",
      };

      return res.cookie("accessToken", response.token, cookieOptions).status(200).json({
        success: true,
        message: "Registro exitoso",
      });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      let token = null;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        token = req.headers.authorization.substring(7);
      } else if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
      }

      if (!token) {
        throw new ErrorResponse("Token no encontrado", 401);
      }

      const isProduction = NODE_ENV === "production";

      return res
        .clearCookie("accessToken", {
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? "none" : "lax",
          path: "/",
        })
        .status(200)
        .json({
          success: true,
          message: "Logout exitoso",
        });
    } catch (error) {
      next(error);
    }
  };
}
