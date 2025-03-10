import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import * as privateController from "../controllers/private.controller";
import { verifyJWT } from "../libs/jwt";

export const mainRouter = Router();

mainRouter.post('/auth/signin', authController.signin);
mainRouter.post('/auth/signup', authController.signup);

mainRouter.post('/auth/verifyotp', authController.verifyOTP);

mainRouter.get('/private', verifyJWT, privateController.test)