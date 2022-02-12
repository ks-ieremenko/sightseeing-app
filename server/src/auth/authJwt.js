import jwt from 'express-jwt';
import { Role } from '../role/role.model.js';
import { User } from '../user/user.model.js';

const secret = "my_secret_key"

export const verifyToken = () => {
  return [jwt({ secret, algorithms: ['HS256'] })];
};
export const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.user.id, { include: Role });
  const role = await user.getRole();
  const isAdmin = role.name === 'Admin';
  if (isAdmin) {
    next();
    return;
  }
  return res.status(403).send({
    message: 'Require Admin Role!',
  });
};
