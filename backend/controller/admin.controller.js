import { getUserInfoById } from "../func.js";
import {
  fetch_single_vehicle,
  get_all_host_vehicles,
  get_all_users,
  update_user,
  update_vehicle,
} from "../helpers/admin.helpers.js";

export const updateVehicleController = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const { query, value } = req.body;
    await update_vehicle(query, value, vehicleId);
    return res.status(200).json({
      msg: "vehicle status updated",
      data: await fetch_single_vehicle(vehicleId),
    });
  } catch (err) {
    return res.status(400).json({
      error: "An error occured",
      err: err,
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const { query, value } = req.body;
    console.log(query, value, userId);
    await update_user(query, value, userId);
    return res.status(200).json({
      msg: "User updated",
      data: await getUserInfoById(userId),
    });
  } catch (err) {
    return res.status(400).json({
      error: "An error occured",
      err: err,
    });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const result = await get_all_users();
    result.length === 0 ? res.json("No users found ") : res.json(result);
  } catch (err) {
    {
      res.json({ msg: "Error_occured" });
    }
  }
};

export const getAllVehiclesController = async (req, res) => {
  try {
    const result = await get_all_host_vehicles();
    result.length === 0
      ? res.json("No hosted vehicles found ")
      : res.json(result);
  } catch (err) {
    {
      res.json({ msg: "Error_occured" });
    }
  }
};

export const getVehicleController = async (req, res) => {
  try {
    const vehicleId = req.params.id;

    return res.status(200).json({
      data: await fetch_single_vehicle(vehicleId),
    });
  } catch (err) {
    return res.status(400).json({
      error: "An error occured",
      err: err,
    });
  }
};
