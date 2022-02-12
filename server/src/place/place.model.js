import Sequelize from 'sequelize';
import { sequelize } from '../constants/sequelize.js';

export const Place = await sequelize.define('places', {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT
  },
  location: {
    type: Sequelize.STRING,
  },
  nearestSubwayStation: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.TEXT
  }
});
