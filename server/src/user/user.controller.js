import UserService from './user.service.js';

class UserController {
  static async deleteUser(req, res) {
    const { id } = req.query;
    try {
      const usersAfterDelete = await UserService.deleteUser(id);
      return res.status(200).send(usersAfterDelete);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  static async changeUsername(req, res) {
    const { oldName, newName } = req.body;
    try {
      const user = await UserService.changeUsername(oldName, newName);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  static allAccess(req, res) {
    return res.status(200).send('Public Content.');
  }

  static userBoard(req, res) {
    return res.status(200).send('User Content.');
  }

  static async adminBoard(req, res) {
    const users = await UserService.getUsers();
    return res.status(200).send(users);
  }


  static async signUp(req, res) {
    const { username, email, dateOfBirth, secretKey, password } = req.body;
    try {
      await UserService.signUp(username, email, dateOfBirth, secretKey, password);
      return res.status(200).send({ message: 'User registered successfully' });
    } catch (e) {
      return res.status(400).send({ message: e.message });
    }
  }

  static async signIn(req, res) {
    const { password, username } = req.body;
    try {
      const user = await UserService.signIn(password, username);
      console.log(password, username)
      return res.status(200).send(user);
    } catch (e) {
      switch (e.message) {
        case 'User Not found':
          return res.status(404).send(e.message);
        case 'Invalid Password':
          return res.status(401).send({ accessToken: null, message: e.message });
      }
      return res.status(400).send(e.message);
    }

  }
}

export default UserController;
