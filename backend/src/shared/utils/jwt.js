import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../../core/config/config.js";

function encodeRole(role) {
  return role === "USER" ? "u" : "a";
}

export function createToken(user) {
  const payload = {
    sub: user._id.toString(),
    rol: encodeRole(user.role),
    prv: user.provider,
    typ: "access",
  };

  return jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "24h",
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("El token ha expirado. Por favor, solicita uno nuevo.");
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("El token proporcionado no es válido o fue alterado.");
    }
    throw new Error("Error al procesar la autenticación.");
  }
}

export function signIn(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "15m",
    algorithm: "HS256",
  });
}
