import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

import { authSchema } from "../types/auth.schema.js";
import { validate } from "../../../core/middleware/validation.js";
import { AuthService } from "../services/auth.service.js";
import { isAuthenticated } from "../../../core/middleware/isAuthenticated.js";
import { ErrorResponse } from "../../../core/errors/error-handler.js";
import User from "../../../core/models/User.js";

import passport from "../../../core/config/passport.js";
import { createToken } from "../../../shared/utils/jwt.js";

const router = Router();

const service = new AuthService();
const controller = new AuthController(service);

// 0. RUTA DE LOGIN GOOGLE
// =========================================================
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account consent",
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed`,
  }),
  (req, res, next) => {
    try {
      const token = createToken(req.user);

      const isProduction = process.env.NODE_ENV === "production";
      const cookieAge = 24 * 60 * 60 * 1000;

      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: cookieAge,
        path: "/",
      });

      // TEST
      // ==========
      console.log(`Login exitoso. User: ${req.user.email}`);
      console.log(`Token: ${token}`);
      console.log(`Login exitoso. User: ${req.user.email}`);
      console.log(`Token: ${token}`);

      return res.status(200).json({
        success: true,
        message: "Login exitoso",
      });
    } catch (error) {
      next(error);
    }
  },
);

// 1. RUTA DE LOGIN
// =========================================================
router.post("/login", validate(authSchema), controller.login);

// 2. RUTA DE REGISTER
// =========================================================
router.post("/register", validate(authSchema), controller.register);

// 3. RUTA DE USUARIO AUTENTICADO
// =========================================================
router.get("/me", isAuthenticated, async (req, res, next) => {
  try {
    const user_id = req.user.id;

    // .select("-password") excluye el password directamente desde la base de datos
    const user = await User.findById(user_id).select("-password").lean();

    if (!user) {
      throw new ErrorResponse("Usuario no encontrado", 404);
    }

    if (!user.active) {
      throw new ErrorResponse("Usuario inactivo", 403);
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// 4. RUTA DE LOGOUT
// =========================================================
router.post("/logout", controller.logout);

export default router;
