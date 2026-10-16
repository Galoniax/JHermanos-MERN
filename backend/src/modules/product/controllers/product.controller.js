import { ErrorResponse } from '../../../core/errors/error-handler.js';
import { ProductService } from '../services/product.service.js';

export class ProductController {
  constructor(productService = new ProductService()) {
    this.productService = productService;
  }

  getProducts = async (req, res, next) => {
    const query = req.query;
    try {
      const response = await this.productService.getProducts(query);
      return res.status(200).json({
        success: true,
        message: 'Productos obtenidos exitosamente',
        ...response,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    const { id } = req.params;

    try {
      if (!id) {
        throw new ErrorResponse('ID de producto requerido', 400);
      }
      const response = await this.productService.getById(id);
      return res.status(200).json({
        success: true,
        message: 'Producto obtenido exitosamente',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  getProductsByIds = async (req, res, next) => {
    const { ids } = req.body;

    try {
      if (!ids || !Array.isArray(ids)) {
        throw new ErrorResponse('IDs de producto requeridos', 400);
      }

      const MAX_CART_ITEMS = 50;

      if (ids.length > MAX_CART_ITEMS) {
        throw new ErrorResponse(
          `No puedes consultar más de ${MAX_CART_ITEMS} productos a la vez`,
          400
        );
      }

      const response = await this.productService.getProductsByIds(ids);
      return res.status(200).json({
        success: true,
        message: 'Productos obtenidos exitosamente',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  getNewProducts = async (req, res, next) => {
    const { limit } = req.query;
    try {
      const response = await this.productService.getNewProducts({ limit });
      return res.status(200).json({
        success: true,
        message: 'Productos obtenidos exitosamente',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
}
