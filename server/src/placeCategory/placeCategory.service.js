import { PlaceCategory } from './placeCategory.model.js';

class PlaceCategoryService {

  // Повертає всі категорії місць
  static async getPlaceCategories() {
    const placeCategories = await PlaceCategory.findAll();
    return placeCategories;
  }

  // Повертає знайдену по id категорію
  static async getPlaceCategoryById(id) {
    const placeCategory = await PlaceCategory.findByPk(id);
    if (!placeCategory) {
      throw new Error("Категорію не знайдено")
    }
    return placeCategory;
  }

  // Повертає всі категорії після видалення по id
  static async deletePlaceCategory(id) {
    const placeCategory = await PlaceCategory.findByPk(id);
    if (!placeCategory) {
      throw new Error('Категорію не знайдено');
    }
    await placeCategory.destroy();
    return PlaceCategory.getPlaceCategories();
  }

  // Додає категорію і повертає її
  static async addPlaceCategory(name) {
    const placeCategoryExist = await PlaceCategory.findOne({ where: { name } });
    if (placeCategoryExist) {
      throw new Error('Категорія вже існує');
    }
    const placeCategory = await PlaceCategory.create({ name });
    return placeCategory;
  }
}

export default PlaceCategoryService;
