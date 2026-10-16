import { ErrorResponse } from '../../../core/errors/error-handler.js';
import Category from '../../../core/models/Category.js';
import Product from '../../../core/models/Product.js';

export class ProductService {
  async getProducts({ page = 1, category, name, sortBy }) {
    const size = 20;
    const currentPage = Math.min(Math.max(1, Number(page)), 800);
    const skip = (currentPage - 1) * size;

    const query = {};

    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) throw new ErrorResponse('Categoría no encontrada', 404);
      query.category = categoryDoc._id;
    }

    if (name) {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.name = { $regex: escaped, $options: 'i' };
    }

    const sortMap = {
      price_asc: { finalPrice: 1 },
      price_desc: { finalPrice: -1 },
      oldest: { createdAt: 1 },
      name_asc: { name: 1 },
      name_desc: { name: -1 },
    };

    const sort = { ...(sortMap[sortBy] || { createdAt: -1 }), _id: 1 };

    const data = await Product.find(query)
      .populate('category', 'name')
      .sort(sort)
      .skip(skip)
      .limit(size + 1);

    const hasMore = data.length > size;
    if (hasMore) data.pop();

    return { data, pagination: { page: currentPage, hasMore } };
  }

  async getById(id) {
    try {
      const product = await Product.findById(id);
      if (!product) throw new ErrorResponse('Producto no encontrado', 404);
      return product;
    } catch (error) {
      throw new ErrorResponse('Error al obtener el producto', 404);
    }
  }

  async getProductsByIds(ids) {
    const products = await Product.find({
      _id: { $in: ids },
      stock: { $gt: 0 },
      active: true,
    })
      .select('_id name image_url price finalPrice discount')
      .populate('category', 'name')
      .lean();

    return products;
  }

  async getNewProducts({ limit = 5 }) {
    const limitNum = Number(limit);

    const products = await Product.find({ active: true })
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(limitNum);

    return products;
  }
}
