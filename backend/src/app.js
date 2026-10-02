import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./core/database/database.js";
import { ErrorHandler } from "./core/middleware/error-handler.js";
import { API_PREFIX, FRONTEND_URL, PORT } from "./core/config/config.js";
import { Auth, Contact, Orders } from "./index.js";

import passport from "passport";

import "./core/config/passport.js";

import productosRoutes from "../routes/productos.routes.js";

// Inicialización de aplicación
const app = express();

app.set("trust proxy", 1); // Confía en el proxy (Vercel, Nginx, etc.)

const origins = [FRONTEND_URL];

// Configuración de CORS
app.use(
  cors({
    origin: origins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Auth-Token", "X-Client-System"], // Headers Autorizados
    exposedHeaders: ["X-Auth-Token"], // Headers Expuestos a frontend
    credentials: true,
  }),
);

app.use(express.json());

await connectDB();

// Cookie parser
app.use(cookieParser());

app.use(passport.initialize());

// Rutas
app.get(`${API_PREFIX}/health`, (req, res) => {
  return res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use(`${API_PREFIX}/auth`, Auth);
app.use(`${API_PREFIX}/contact`, Contact);
app.use(`${API_PREFIX}/productos`, productosRoutes);
app.use(`${API_PREFIX}/orders`, Orders);

// Middleware de manejo de errores
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}${API_PREFIX}`);
});

export default app;
