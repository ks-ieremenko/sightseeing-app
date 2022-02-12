import { authHeader } from './auth-header';
import axios from 'axios';
import authService from './auth-service';

class UserService {
  URL = 'http://localhost:8080/api/test';

  async checkAdmin() {
    try {
      const res = await axios.get(`${this.URL}/admin`, {
        headers: authHeader(),
      });
      const user = authService.getCurrentUser();
      authService.setCurrentUser({ ...user, usersList: res.data });
      return authService.getCurrentUser();
    } catch (error) {
      return false;
    }
  }

  async changeUsername(oldName, newName) {
    await axios.post(
      `${this.URL}/change`,
      { oldName, newName },
      {
        headers: authHeader(),
      }
    );
  }

  async deleteUser(id) {
    const users = await axios.delete(`${this.URL}/admin/delete?id=${id}`, {
      headers: authHeader(),
    });
    return users.data;
  }
}

export default new UserService();
