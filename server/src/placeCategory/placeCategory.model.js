import Sequelize from 'sequelize';
import { sequelize } from '../constants/sequelize.js';
export const PlaceCategory = await sequelize.define('placeCategories', {
  name: {
    type: Sequelize.STRING,
  }
});
