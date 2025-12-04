import express, { Router } from "express";
import requireAuth from "../Utils/verifyToken";
import { upload } from "../Utils/multerConfig";
import {
  GetProfileController,
  ProfileController,
  GetAllProfileController,
} from "../Controllers/Profile.controller";

const router: Router = express.Router();

router.post(
  "/profile",
  requireAuth,
  upload.single("picture"),
  ProfileController
);

router.get("/getProfile", requireAuth, GetProfileController);
router.get("/getAllProfile", requireAuth, GetAllProfileController);

export default router;
