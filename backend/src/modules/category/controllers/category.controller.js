import { CategoryService } from '../services/category.service.js';

export class CategoryController {
  constructor(categoryService = new CategoryService()) {
    this.categoryService = categoryService;
  }

  async getCategories(req, res, next) {
    try {
      const categories = await this.categoryService.getCategories();
      res.json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }
}
