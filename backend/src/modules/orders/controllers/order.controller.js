import { OrderService } from "../services/order.service.js";

export class OrderController {
  constructor(orderService = new OrderService()) {
    this.orderService = orderService;
  }

  create = async (req, res, next) => {
    try {
      const { items, total_amount, shipping_address, customer } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          error: "La orden debe contener al menos un producto.",
        });
      }

      const orderData = {
        items: items.map((item) => ({
          product: item._id || item.id,
          name: item.name || item.nombre,
          image_url: item.image_url || item.imagen,
          quantity: Number(item.cantidad || item.quantity || 1),
          unit_price: Number(item.price || item.precio || 0),
        })),
        total_amount: Number(total_amount),
        shipping_address: shipping_address || {
          address: "Retiro en Taller Hermanos Jota",
          city: "Buenos Aires",
          state: "CABA",
          zip_code: "1232",
          country: "Argentina",
        },
        customer: customer || {
          name: req.user?.nombre || "Cliente Invitado",
          email: req.user?.email || "cliente@hermanosjota.com",
          phone: req.user?.phone || "",
        },
        user: req.user?._id || req.user?.id || undefined,
        status: "PENDIENTE",
      };

      const order = await this.orderService.create(orderData);

      return res.status(201).json({
        success: true,
        message: "Orden creada exitosamente",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  };

  list = async (req, res, next) => {
    try {
      const filter = req.user ? { user: req.user._id || req.user.id } : {};
      const orders = await this.orderService.getAll(filter);

      return res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  };
}
