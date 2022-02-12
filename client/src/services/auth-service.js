import { authHeader } from './auth-header';
import axios from 'axios';

class AuthService {
  API_URL = 'http://localhost:8080/api/auth';

  async register(username, email, dateOfBirth, password, secretKey) {
    return axios.post(this.API_URL + '/signup', {
      username,
      email,
      dateOfBirth,
      password,
      secretKey
    });
  }

  async logout() {
    localStorage.removeItem('user');
  }

  async login(username, password) {
    const response = await axios.post(`${this.API_URL}/signin`, {
      username,
      password,
    });
    const user = response.data;
    if (user.accessToken) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export default new AuthService();
