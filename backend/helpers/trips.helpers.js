import got from "got";
import { pool } from "../database/database.js";
import { getUserInfoById } from "../func.js";
import { generateRandomString } from "../utils/softFunctions.js";
import { random_user_id } from "../user.js";

export async function create_trip(
  userId,
  vehicleId,
  tripId,
  price,
  totalPrice,
  pickupLocation,
  dropoffLocation,
  pickupDate,
  dropoffDate,
  duration
) {
  try {
    const sql =
      "INSERT INTO dclr_cargenie_trips(d_user_id,d_vehicle_id,d_trip_id,d_price,d_total_fee,d_pickup_location,d_dropoff_location,d_date_pickup,d_date_dropoff,d_is_paid,d_status,d_completed,d_duration) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";

    const [result] = await pool.query(sql, [
      userId,
      vehicleId,
      tripId,
      price,
      totalPrice,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
      0,
      "pending",
      0,
      duration,
    ]);

    //check this out
    const [user] = await pool.query(
      "UPDATE dclr_cargenie_users SET d_is_user_host = 1 WHERE d_user_id=?",
      [userId]
    );

    return result;
  } catch (err) {
    throw err;
  }
}

export async function fetch_user_trips(userId) {
  try {
    const sql = "SELECT * FROM dclr_cargenie_trips WHERE d_user_id=?";

    const [result] = await pool.query(sql, [userId]);
    return result;
  } catch (err) {
    throw err;
  }
}

export async function fetch_trips_by_vehicle_id(vehicleId) {
  try {
    const sql = "SELECT * FROM dclr_cargenie_trips WHERE d_vehicle_id=?";

    const [result] = await pool.query(sql, [vehicleId]);
    return result;
  } catch (err) {
    throw err;
  }
}

export async function fetch_single_trip(tripId) {
  try {
    const sql = "SELECT * FROM dclr_cargenie_trips WHERE d_trip_id=?";

    const [result] = await pool.query(sql, [tripId]);

    return result;
  } catch (err) {
    throw err;
  }
}

export async function update_trip(query, value, tripId) {
  try {
    const sql = `UPDATE dclr_cargenie_trips SET ${query}=? WHERE d_trip_id=?`;

    const [result] = await pool.query(sql, [value, tripId]);

    return result;
  } catch (err) {
    throw err;
  }
}

export async function generate_charge(data) {
  try {
    const user = await getUserInfoById(data.userId);
    const r_id = generateRandomString(7);
    const {
      userId,
      vehicleId,
      price,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
    } = data;

    const response = await got
      .post("https://api.flutterwave.com/v3/payments", {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
        json: {
          tx_ref: `cargenie-tx-${r_id}`,
          amount: data.price,
          currency: "NGN",
          redirect_url: `${process.env.API_URL}/api/trips/payment/verify`,
          meta: {
            userId,
            vehicleId,
            price,
            pickupLocation,
            dropoffLocation,
            pickupDate,
            dropoffDate,
          },
          customer: {
            email: user.d_email,
            name: user.d_firstName + " " + user.d_lastname,
          },
        },
      })
      .json();

    return response;
  } catch (err) {
    console.log(err.code);
    console.log(err.response.body);
  }
}
