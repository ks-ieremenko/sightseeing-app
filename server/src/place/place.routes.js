import * as authJwt from '../auth/authJwt.js';
import express from 'express';

import PlaceController from './place.controller.js';

export const placeRouter = express.Router();

placeRouter.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
});

placeRouter.get(
  '/api/place/filter',
  PlaceController.getPlacesByCategory
);
placeRouter.get(
  '/api/place',
  PlaceController.getPlaces
);
placeRouter.get(
  '/api/place/:id',
  PlaceController.getPlaceById
);
placeRouter.post(
  '/api/place',
  authJwt.verifyToken(),
  PlaceController.addPlace
);
placeRouter.delete(
  '/api/place',
  authJwt.verifyToken(),
  PlaceController.deletePlace
);
placeRouter.patch(
  '/api/place/edit/:id',
  authJwt.verifyToken(),
  PlaceController.editPlace
)
