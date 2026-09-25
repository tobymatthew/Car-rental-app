import { pool } from "../database/database.js";
import { random_user_id } from "../user.js";

export async function create_notification(message, userId, tripId, type) {
  try {
    const sql =
      "INSERT INTO dclr_cargenie_notifications(d_user_id, d_trip_id, d_type, d_message, d_notification_id, d_status) VALUES(?,?,?,?,?,?)";

    const [result] = await pool.query(sql, [
      userId,
      tripId,
      type,
      message,
      await random_user_id(8), //"We need a unique Id in the notification schema"
      0,
    ]);

    return result;
  } catch (err) {
    throw err;
  }
}

export async function fetch_all_notifications(userId) {
  try {
    const sql = "SELECT * FROM dclr_cargenie_notifications WHERE d_user_id=?";

    const [result] = await pool.query(sql, [userId]);
    return result;
  } catch (err) {
    throw err;
  }
}

export async function fetch_single_notification(notificationId) {
  try {
    const sql =
      "SELECT * FROM dclr_cargenie_notifications WHERE d_notification_id=?";

    const [result] = await pool.query(sql, [notificationId]);

    return result;
  } catch (err) {
    throw err;
  }
}

export async function update_notification(notificationId) {
  try {
    const sql =
      "UPDATE dclr_cargenie_notifications SET d_status = 1 WHERE d_notification_id=?";

    const [result] = await pool.query(sql, [notificationId]);

    return result;
  } catch (err) {
    throw err;
  }
}

export async function delete_notification(notificationId) {
  try {
    const sql =
      "DELETE FROM `dclr_cargenie_notifications` WHERE d_notification_id=?";

    await pool.query(sql, [notificationId]);
    return true;
  } catch (err) {
    throw err;
  }
}
