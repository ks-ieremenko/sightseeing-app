import { User } from './user.model.js';
import { Role } from "../role/role.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService {
  //секретний ключ адміна
  static secretKeyCode = 'admin_secret_key'
  //секретний ключ для хешування паролю
  static secret = "my_secret_key"

  // Повертає всіх зареєстрованих користувачів
  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  // Повертає всіх зареєстрованих користувачів після видалення одного по id
  static async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
    return UserService.getUsers();
  }

  // Повертає зареєстрованого користувача
  static async signIn(password, name) {
    const user = await User.findOne({
      where: { username: name },
      include: Role,
    });
    if (!user) {
      throw new Error('Користувача не знайдено');
    }

    const passwordIsValid = bcryptjs.compareSync(password, user.password);

    if (!passwordIsValid) {
      throw new Error('Неправильний пароль')
    }

    const accessToken = jwt.sign({ id: user.id }, this.secret, {
      expiresIn: 86400,
    });
    const role = await user.getRole();
    const roleText = `ROLE_${role.name.toUpperCase()}`;
    const { id, email, username, dateOfBirth } = user;
    return { id, email, username, dateOfBirth, accessToken, role: roleText }
  }

  // Повертає авторизованого користувача
  static async signUp(username, email, dateOfBirth, secretKey, password) {
    const passwordHash = await bcryptjs.hash(password, 8);
    const year = new Date(dateOfBirth).getYear();
    const currentYear = new Date().getYear();

    const minAge = 13;
    if (currentYear - year <= 13) {
      throw new Error("Користувач повинен бути старше 13 років")
    }
    const user = await User.create({
      username,
      email,
      dateOfBirth,
      password: passwordHash
    });

    if (secretKey === this.secretKeyCode) {
      const foundRole = await Role.findOne({
        where: { name: "Admin" },
      });
      await user.setRole(foundRole);
    } else {
      const foundRole = await Role.findOne({
        where: { name: "User" },
      });
      await user.setRole(foundRole);
    }
  }

  // Повертає користувача із новим ім'ям
  static async changeUsername(oldName, newName) {
    const user = await User.findOne({ where: { username: oldName } });
    if (!user) {
      throw new Error('Користувача не знайдено');
    }
    const userExist = await User.findOne({
      where: { username: newName },
    });
    if (userExist) {
      throw new Error(`${newName} вже існує`);
    }
    user.username = newName;
    await user.save();
    return user;
  }
}

export default UserService;
