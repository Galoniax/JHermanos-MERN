import { Router } from 'express';
import { CategoryService } from '../services/category.service.js';
import { CategoryController } from '../controllers/category.controller.js';

const router = Router();

const service = new CategoryService();
const controller = new CategoryController(service);

// Obtener todas las categorías
router.get('/', controller.getCategories);

export default router;
