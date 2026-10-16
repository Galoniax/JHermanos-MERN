import { Router } from 'express';
import { getStorage } from '../../../core/config/cloudinary.js';
import { ProductService } from '../services/product.service.js';
import { ProductController } from '../controllers/product.controller.js';
import multer from 'multer';

const upload = multer({
  storage: getStorage('products/temp'),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Tipo de archivo no permitido. Solo se aceptan imágenes y videos.'
        )
      );
    }
  },
});

const router = Router();

const service = new ProductService();
const controller = new ProductController(service);

// Obtener productos (con paginación y filtros)
router.get('/', controller.getProducts);

// Obtener productos por IDs (para el carrito)
router.post('/cart', controller.getProductsByIds);

// Obtener productos por nuevos
router.get('/new', controller.getNewProducts);

// Obtener producto por ID
router.get('/:id', controller.getById);

export default router;
