import * as authJwt from '../auth/authJwt.js';
import express from 'express';

import PlaceCategoryController from './placeCategory.controller.js';

export const placeCategoryRouter = express.Router();

placeCategoryRouter.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
});

placeCategoryRouter.get(
  '/api/placeCategory',
  // authJwt.verifyToken(),
  PlaceCategoryController.getCategories
);
placeCategoryRouter.get(
  '/api/placeCategory/:id',
  // authJwt.verifyToken(),
  PlaceCategoryController.getCategoryById
);
placeCategoryRouter.post(
  '/api/placeCategory',
  authJwt.verifyToken(),
  PlaceCategoryController.addCategory
);
placeCategoryRouter.delete(
  '/api/placeCategory/:id',
  authJwt.verifyToken(),
  PlaceCategoryController.deleteCategory
);
// placeRouter.delete(
//   '/api/test/admin/delete',
//   [authJwt.verifyToken(), authJwt.isAdmin],
//   PlaceController.deleteUser
// );
