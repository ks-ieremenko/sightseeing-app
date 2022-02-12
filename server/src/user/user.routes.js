import * as authJwt from '../auth/authJwt.js';
import express from 'express';

import UserController from './user.controller.js';
import * as verifySignUp from "../middleware/verifySignUp.js";

export const userRouter = express.Router();

userRouter.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
});

userRouter.get('/api/test/all', UserController.allAccess);

userRouter.get(
  '/api/test/user',
  authJwt.verifyToken(),
  UserController.userBoard
);

userRouter.get(
  '/api/test/admin',
  [authJwt.verifyToken(), authJwt.isAdmin],
  UserController.adminBoard
);
userRouter.post(
  '/api/test/change',
  authJwt.verifyToken(),
  UserController.changeUsername
);
userRouter.delete(
  '/api/test/admin/delete',
  [authJwt.verifyToken(), authJwt.isAdmin],
  UserController.deleteUser
);

userRouter.post(
  '/api/auth/signup',
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
  ],
  UserController.signUp
);

userRouter.post('/api/auth/signin', UserController.signIn);