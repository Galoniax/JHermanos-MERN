import Order from "../../../core/models/Order.js";

export class OrderService {
  async create(orderData) {
    const order = await Order.create(orderData);
    return order;
  }

  async getAll(filter = {}) {
    return await Order.find(filter).sort({ createdAt: -1 }).lean();
  }

  async getById(id) {
    return await Order.findById(id).lean();
  }
}
