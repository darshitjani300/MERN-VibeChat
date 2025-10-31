import express from "express";
import {
  ForgotPassword,
  LoginController,
  SignupController,
} from "../Controllers/Auth.controller.js";
import validateSchema from "../middlewares/validator.js";
import { loginSchema, registerSchema } from "../validators/auth.schema.js";

const router = express.Router();

router.post("/signup", validateSchema(registerSchema), SignupController);
router.post("/login", validateSchema(loginSchema), LoginController);
router.post("/forgotPassword", ForgotPassword);

export default router;
