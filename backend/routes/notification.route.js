import {
  createNotificationController,
  getAllNotificationController,
  getSingleNotificationController,
  updateNotificationController,
} from "../controller/notification.controller.js";
import express from "express";
const router = express.Router();

router.post("/", createNotificationController);
router.patch("/:id", updateNotificationController);
router.get("/all/:userId", getAllNotificationController);
router.get("/:id", getSingleNotificationController);

export default router;
