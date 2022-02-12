import PlaceCategoryService from './placeCategory.service.js';

class PlaceCategoryController {
  static async getCategories(req, res) {
    try {
      const placeCategories = await PlaceCategoryService.getPlaceCategories();
      return res.status(200).send(placeCategories);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  static async getCategoryById(req, res) {
    const { id } = req.params;
    try {
      const placeCategory = await PlaceCategoryService.getPlaceCategoryById(id);
      return res.status(200).send(placeCategory);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  static async addCategory(req, res) {
    const { name } = req.body;
    try {
      const placeCategory = await PlaceCategoryService.addPlaceCategory(name);
      return res.status(200).send(placeCategory);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  static async deleteCategory(req, res) {
    const { id } = req.query;
    try {
      const placeCategoriesAfterDelete = await PlaceCategoryService.deletePlaceCategory(id);
      return res.status(200).send(placeCategoriesAfterDelete);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export default PlaceCategoryController;
