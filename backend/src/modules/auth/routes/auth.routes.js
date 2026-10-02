import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

import { loginSchema, registerSchema } from "../types/auth.schema.js";
import { validate } from "../../../core/middleware/validation.js";
import { AuthService } from "../services/auth.service.js";
import { isAuthenticated } from "../../../core/middleware/isAuthenticated.js";
import { ErrorResponse } from "../../../core/errors/error-handler.js";
import User from "../../../core/models/User.js";

import passport from "../../../core/config/passport.js";
import { createToken, signIn } from "../../../shared/utils/jwt.js";
import { sendPopupResponse } from "../../../shared/utils/popup.js";
import { NODE_ENV } from "../../../core/config/config.js";

const router = Router();

const service = new AuthService();
const controller = new AuthController(service);

// OAuth Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account consent",
  }),
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, result, info) => {
    if (err) {
      return sendPopupResponse(res, {
        type: "OAUTH_ERROR",
        error: err.message || "Error de autenticación",
      });
    }

    // Se canceló el login
    if (!result) {
      return sendPopupResponse(res, {
        type: "OAUTH_ERROR",
        error: "Autenticación cancelada o denegada",
      });
    }

    // 3. Autenticación exitosa (result contiene lo que enviaste en el done(null, user))
    try {
      const { payload, isNew } = user;

      // 4. Si es usuario nuevo, se dirige a registrarse
      if (isNew) {
        const registerToken = signIn(payload);

        return sendPopupResponse(res, {
          type: "OAUTH_REGISTER",
          data: registerToken,
        });
      }

      const token = createToken(payload);

      const isProduction = NODE_ENV === "production";
      const cookieAge = 24 * 60 * 60 * 1000;

      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: cookieAge,
        path: "/",
      });

      return sendPopupResponse(res, {
        type: "OAUTH_SUCCESS",
      });
    } catch (error) {
      return sendPopupResponse(res, {
        type: "OAUTH_ERROR",
        error: "Error de autenticación",
      });
    }
  })(req, res, next);
});

// Auth local y sesión
router.post("/login", validate(loginSchema), controller.login);
router.post("/register", validate(registerSchema), controller.register);

router.get("/me", isAuthenticated, async (req, res, next) => {
  try {
    const user_id = req.user.id;
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

router.post("/logout", controller.logout);

export default router;
