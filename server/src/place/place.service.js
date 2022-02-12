import { Place } from './place.model.js';
import { PlaceCategory } from "../placeCategory/placeCategory.model.js";

class PlaceService {
  // Повертає всі місця
  static async getPlaces() {
    const places = await Place.findAll({ include: [PlaceCategory] });
    return places;
  }

  // Повертає місце, знайдене по id
  static async getPlaceById(id) {
    const place = await Place.findByPk(id, { include: [PlaceCategory] });
    if (!place) {
      throw new Error("Місце не знайдено")
    }
    return place;
  }

  // Повертає місце, знайдене по категорії
  static async getPlacesByCategory(categoryName) {
    const category = await PlaceCategory.findOne({ where: { name: categoryName } })
    const places = await Place.findAll({ where: { placeCategoryId: category.id }, include: [PlaceCategory] });
    return places;
  }

  // Повертає всі місця після видалення по id
  static async deletePlace(id) {
    const place = await Place.findByPk(id);
    if (!place) {
      throw new Error('Місце не знайдено');
    }
    await place.destroy();
    return PlaceService.getPlaces();
  }

  // Створює місце і повертає його
  static async addPlace(name, description, location, nearestSubwayStation, category, image) {
    const placeCategory = await PlaceCategory.findOne({ where: { name: category } })
    const [place, created] = await Place.findOrCreate({
      where: { name },
      defaults: { name, description, location, nearestSubwayStation, image }
    });
    if (!created) {
      throw new Error("Місце з таким ім\'ям вже існує")
    }
    await place.setPlaceCategory(placeCategory)
    return place;
  }

  // Повертає відредаговане місце
  static async editPlace(id, name, description, location, nearestSubwayStation, category, image) {
    const place = await Place.findByPk(id);
    const placeCategory = await PlaceCategory.findOne({ where: { name: category } })
    const duplicateName = await Place.findAll({ where: { name } })
    if (duplicateName.length)
      throw new Error("Місце з таким ім\'ям вже існує")
    place.set({ name, description, location, nearestSubwayStation, image })
    place.setPlaceCategory(placeCategory);
    await place.save();
    return place;
  }
}

export default PlaceService;
