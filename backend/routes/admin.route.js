import express from "express";
import {
  getAllUsersController,
  getAllVehiclesController,
  getVehicleController,
  updateUserController,
  updateVehicleController,
} from "../controller/admin.controller.js";

const router = express.Router();

router.post("/update/vehicle/:id", updateVehicleController);
router.post("/update/user/:id", updateUserController);
router.get("/users", getAllUsersController);
router.get("/vehicles", getAllVehiclesController);
router.get("/vehicle/:id", getVehicleController);

export default router;
