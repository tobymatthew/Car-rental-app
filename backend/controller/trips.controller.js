import {
  create_trip,
  fetch_single_trip,
  fetch_trips_by_vehicle_id,
  fetch_user_trips,
  generate_charge,
  update_trip,
} from "../helpers/trips.helpers.js";
import { generateRandomString } from "../utils/softFunctions.js";
import { get_vehicle_by_id } from "../user.js";

export const createTripController = async (req, res) => {
  try {
    const { userId, vehicleId, pickupDate, dropoffDate, totalPrice, duration } =
      req.body;
    const tripId = generateRandomString(8);
    const [v] = await get_vehicle_by_id(vehicleId);

    await create_trip(
      userId,
      vehicleId,
      tripId,
      v.d_price,
      totalPrice,
      v.d_pickup_location,
      v.d_dropoff_location,
      pickupDate,
      dropoffDate,
      duration
    );
    const data = await fetch_single_trip(tripId);

    return res.status(200).json({
      msg: "Trip Created",
      data,
    });
  } catch (err) {
    return res.status(400).json({
      error: "An error occured",
      err: err,
    });
  }
};

export const getUserTripsController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await fetch_user_trips(userId);
    return res.status(200).json({
      data,
    });
  } catch (err) {
    return res.status(400).json({
      error: "An error occured",
      err: err,
    });
  }
};

export const getVehicleTripsController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await fetch_trips_by_vehicle_id(id);
    return res.status(200).json({
      data,
    });
  } catch (err) {
    return res.status(400).json({
      error: "An error occured",
      err: err,
    });
  }
};

export const getTripController = async (req, res) => {
  try {
    const tripId = req.params.id;

    return res.status(200).json({
      data: await fetch_single_trip(tripId),
    });
  } catch (err) {
    return res.status(400).json({
      error: "An error occured",
      err: err,
    });
  }
};

export const getAllTripsController = async (req, res) => {
  try {
    const tripId = req.params.id;

    return res.status(200).json({
      data: await fetch_single_trip(tripId),
    });
  } catch (err) {
    return res.status(400).json({
      error: "An error occured",
      err: err,
    });
  }
};

export const updateTripController = async (req, res) => {
  try {
    const tripId = req.params.id;
    const { query, value } = req.body;
    await update_trip(query, value, tripId);
    return res.status(200).json({
      msg: "Trip status updated",
      data: await fetch_single_trip(tripId),
    });
  } catch (err) {
    return res.status(400).json({
      error: "An error occured",
      err: err,
    });
  }
};
