import { pool } from "../database/database.js";

export async function update_vehicle(query, value, vehicleId) {
  try {
    const sql = `UPDATE dclr_cargenie_host_vehicle SET ${query}=? WHERE d_vehicle_id=?`;

    const [result] = await pool.query(sql, [value, vehicleId]);

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function update_user(query, value, userId) {
  try {
    const sql = `UPDATE dclr_cargenie_users SET ${query}=? WHERE d_user_id=?`;

    const [result] = await pool.query(sql, [value, userId]);

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}


export async function get_all_host_vehicles() {
  try {
    const sql = "SELECT * FROM dclr_cargenie_host_vehicle ";

    const [result] = await pool.query(sql);

    return result;
  } catch (err) {
    throw err;
  }
}
export async function get_all_users() {
  try {
    const sql = "SELECT * FROM dclr_cargenie_users ";

    const [result] = await pool.query(sql);

    return result;
  } catch (err) {
    throw err;
  }
}

export async function fetch_single_vehicle(vehicleId) {
  try {
    const sql = "SELECT * FROM dclr_cargenie_host_vehicle WHERE d_vehicle_id=?";

    const [result] = await pool.query(sql, [vehicleId]);

    return result;
  } catch (err) {
    throw err;
  }
}
