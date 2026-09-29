import jwt from "jsonwebtoken";
import { verifyToken } from "../../shared/utils/jwt.js";
import { ErrorResponse } from "../errors/error-handler.js";

import { NODE_ENV } from "../config/config.js";

export const isAuthenticated = async (req, res, next) => {
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

    const payload = verifyToken(token);

    if (payload.typ !== "access") {
      throw new ErrorResponse("Token invalido", 401);
    }

    req.user = {
      id: payload.sub,
      role: payload.rol === "a" ? "ADMIN" : "USER",
    };

    next();
  } catch (error) {
    const isProduction = NODE_ENV === "production";

    res.status(401).clearCookie("accessToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    if (
      error instanceof jwt.JsonWebTokenError ||
      error.name === "TokenExpiredError"
    ) {
      return next(new ErrorResponse("Sesión expirada o token inválido", 401));
    }

    next(error);
  }
};
