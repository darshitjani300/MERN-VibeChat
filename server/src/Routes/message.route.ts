import express from "express";
import requireAuth from "../Utils/verifyToken";
import { GetMessageController } from "../Controllers/Message.controller";

const router = express.Router();

router.get("/:otherUserId", requireAuth, GetMessageController);

export default router;
