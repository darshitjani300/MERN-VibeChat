import express, { Router } from "express";
import {
  ForgotPassword,
  LoginController,
  ResetPassword,
  SignupController,
} from "../Controllers/Auth.controller.js";
import validateSchema from "../middlewares/validator.js";
import { loginSchema, registerSchema } from "../validators/auth.schema.js";

const router: Router = express.Router();

router.post("/signup", validateSchema(registerSchema), SignupController);
router.post("/login", validateSchema(loginSchema), LoginController);
router.post("/forgotPassword", ForgotPassword);
router.post("/resetPassword", ResetPassword);

export default router;
