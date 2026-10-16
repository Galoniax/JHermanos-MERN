import Category from '../../../core/models/Category.js';
import { ErrorResponse } from '../../../core/errors/error-handler.js';

export class CategoryService {
  async getCategories() {
    const categories = await Category.find().select('_id name').lean();
    if (!categories) {
      throw new ErrorResponse('Categorías no encontradas', 404);
    }

    return categories;
  }
}
