import { authHeader } from './auth-header';
import axios from 'axios';

class PlaceService {
  API_URL = 'http://localhost:8080/api';

  async createPlace(name, description, location, nearestSubwayStation, category, image) {
    console.log("here")
    return axios.post(this.API_URL + '/place', {
      name, description, location, nearestSubwayStation, category, image
    }, {
      headers: authHeader(),
    });
  }

  async getPlaces() {
    const places = await axios.get(this.API_URL + '/place', {
      headers: authHeader(),
    });
    return places;
  }

  async getPlacesByCategory(name) {
    const places = await axios.get(this.API_URL + '/place/filter', {
      headers: authHeader(),
      params: {
        category: name
      }
    });
    return places;
  }

  async deletePlaceById(id) {
    const places = await axios.delete(this.API_URL + '/place', {
      headers: authHeader(),
      params: { id }
    });
    return places;
  }

  async getPlaceById(id) {
    const place = await axios.get(this.API_URL + `/place/${id}`, {
      headers: authHeader(),
    });
    return place;
  }

  async editPlace(id, name, description, location, nearestSubwayStation, category, image) {
    const place = await axios.patch(this.API_URL + `/place/edit/${id}`, {
      name,
      description,
      location,
      nearestSubwayStation,
      category,
      image
    }, {
      headers: authHeader(),
    });
    return place;
  }

  async getCategories() {
    const place = await axios.get(this.API_URL + "/placeCategory", {
      headers: authHeader(),
    });
    return place;
  }

  async addCategory(name) {
    await axios.post(this.API_URL + "/placeCategory", { name }, {
      headers: authHeader(),
    });
  }
}

export default new PlaceService();
