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
  return jwt.verify(token, JWT_SECRET);
}
