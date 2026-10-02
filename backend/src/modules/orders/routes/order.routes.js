import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";

const router = Router();
const controller = new OrderController();

// POST /api/orders - Crear orden de compra
router.post("/", controller.create);

// GET /api/orders - Listar órdenes
router.get("/", controller.list);

export default router;
