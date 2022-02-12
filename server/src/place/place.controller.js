import PlaceService from './place.service.js';

class PlaceController {
  static async getPlaces(req, res) {
    try {
      const places = await PlaceService.getPlaces();
      return res.status(200).send(places);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  static async getPlaceById(req, res) {
    const { id } = req.params;
    try {
      const place = await PlaceService.getPlaceById(id);
      return res.status(200).send(place);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  static async getPlacesByCategory(req, res) {
    const { category } = req.query;
    try {
      const places = await PlaceService.getPlacesByCategory(category);
      return res.status(200).send(places);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  static async addPlace(req, res) {
    const { name, description, location, nearestSubwayStation, category, image } = req.body;
    try {
      const place = await PlaceService.addPlace(name, description, location, nearestSubwayStation, category, image);
      return res.status(200).send(place);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  static async deletePlace(req, res) {
    const { id } = req.query;
    try {
      const placesAfterDelete = await PlaceService.deletePlace(id);
      return res.status(200).send(placesAfterDelete);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  static async editPlace(req, res) {
    const { id } = req.params;
    const { name, description, location, nearestSubwayStation, category, image } = req.body;
    try {
      const place = await PlaceService.editPlace(id, name, description, location, nearestSubwayStation, category, image);
      return res.status(200).send(place);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export default PlaceController;
