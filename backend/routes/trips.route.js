import express from "express";
import {
  createTripController,
  getTripController,
  getUserTripsController,
  updateTripController,
  getVehicleTripsController,
} from "../controller/trips.controller.js";
const router = express.Router();

router.post("/", createTripController);
router.get("/all/:userId", getUserTripsController);
router.get("/vehicle/:id", getVehicleTripsController);
router.get("/:id", getTripController);
router.put("/:id", updateTripController);

export default router;
