import Order from '../../../core/models/Order.js';
import Product from '../../../core/models/Product.js';

export class OrderService {
  async getOrdersByUser({ page = 1, user_id }) {
    const size = 10;
    const currentPage = Math.max(1, Number(page));

    const skip = (currentPage - 1) * size;

    const data = await Order.find({ user: user_id })
      .populate({
        path: 'items.product',
        model: Product,
        select: 'name image_url price finalPrice',
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(size + 1)
      .lean();

    const hasMore = data.length > size;
    if (hasMore) data.pop();

    return { data, pagination: { page: currentPage, hasMore } };
  }

  async getById(id) {
    return await Order.findById(id).lean();
  }
}
