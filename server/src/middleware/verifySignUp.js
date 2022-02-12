const ROLES = ['User', 'Admin'];
import { User } from '../user/user.model.js';
import sequelize from 'sequelize';

const { Op } = sequelize;
export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const { username, email } = req.body;
  const user = await User.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });
  if (user) {
    return res.status(400).send({
      message: 'Пошта або ім\'я користувача вже існують!',
    });
  }
  next();
};

export const checkRolesExisted = (req, res, next) => {
  const { role } = req.body;
  let failedRole;
  if (role) {
    const found = ROLES.includes(role);
    if (!found) {
      return res.status(400).send({
        message: `Failed! Role ${role} does not exist`,
      });
    }
  }
  next();
};
