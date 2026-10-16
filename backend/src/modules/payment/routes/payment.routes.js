import { Router } from 'express';
import { PaymentService } from '../services/payment.service.js';
import { PaymentController } from '../controllers/payment.controller.js';
import { isAuthenticated } from '../../../core/middleware/isAuthenticated.js';

const router = Router();

const service = new PaymentService();
const controller = new PaymentController(service);

router.post('/checkout', controller.createPayment);

export default router;
