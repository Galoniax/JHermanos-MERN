import { ErrorResponse } from '../../../core/errors/error-handler.js';
import { OrderService } from '../services/order.service.js';

export class OrderController {
  constructor(orderService = new OrderService()) {
    this.orderService = orderService;
  }

  getOrders = async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const user_id = req.user.id;

    try {
      if (isNaN(page)) {
        throw new ErrorResponse('La página debe ser un número', 400);
      }

      const orders = await this.orderService.getOrdersByUser({ user_id, page });

      return res.status(200).json({
        success: true,
        ...orders,
      });
    } catch (error) {
      next(error);
    }
  };
}
