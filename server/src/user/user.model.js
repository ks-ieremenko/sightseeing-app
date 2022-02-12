import Sequelize from 'sequelize';
import { sequelize } from '../constants/sequelize.js';

export const User = await sequelize.define('users', {
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  dateOfBirth: {
    type: Sequelize.DATEONLY
  },
  password: {
    type: Sequelize.STRING,
  },
});
