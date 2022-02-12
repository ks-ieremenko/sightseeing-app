import Sequelize from 'sequelize';
import { sequelize } from '../constants/sequelize.js';

export const Role = await sequelize.define('roles', {
  name: {
    type: Sequelize.STRING,
  },
});
