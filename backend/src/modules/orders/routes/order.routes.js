import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { isAuthenticated } from '../../../core/middleware/isAuthenticated.js';

const router = Router();
const controller = new OrderController();

router.get('/', isAuthenticated, controller.getOrders);

export default router;
