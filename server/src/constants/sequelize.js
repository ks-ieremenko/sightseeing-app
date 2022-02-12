import Sequelize from 'sequelize';
import {
    DB,
    DB_USER,
    DB_PASSWORD,
    DB_DIALECT,
    DB_HOST,
} from '../config/db.config.js';
export const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
    dialect: DB_DIALECT,
    host: DB_HOST,
});
