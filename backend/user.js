import bcrypt from "bcrypt";
import { pool } from "./database/database.js";

export async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export async function random_user_id(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const sql = "SELECT d_user_id FROM dclr_cargenie_users WHERE d_user_id=?";

  const [sql_result] = await pool.query(sql, [result]);

  if (sql_result.length === 0) {
    return result;
  } else {
    return random_user_id();
  }
}

export async function random_vehicle_id(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const sql =
    "SELECT d_vehicle_id FROM dclr_cargenie_host_vehicle WHERE d_vehicle_id=?";

  const [sql_result] = await pool.query(sql, [result]);

  if (sql_result.length === 0) {
    return result;
  } else {
    return random_vehicle_id();
  }
}

export async function random_trip_id(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const sql = "SELECT d_trip_id FROM dclr_cargenie_trips WHERE d_trip_id=?";

  const [sql_result] = await pool.query(sql, [result]);

  if (sql_result.length === 0) {
    return result;
  } else {
    return random_vehicle_id();
  }
}

export async function does_user_exist(email) {
  const [result] = await pool.query(
    "SELECT d_email FROM dclr_cargenie_users WHERE d_email=?",
    [email]
  );
  if (result.length !== 0) return true;
}

export async function is_deleted_acct(email) {
  const [result] = await pool.query(
    "SELECT * FROM dclr_cargenie_users WHERE d_email=? AND d_account_deleted=1",
    [email]
  );
  if (result.length !== 0) return true;
}

export async function does_user_exist_by_id(id) {
  const [result] = await pool.query(
    "SELECT d_user_id FROM dclr_cargenie_users WHERE d_user_id=?",
    [id]
  );
  if (result.length !== 0) return true;
}

export async function does_vehicle_exist_by_id(id) {
  const [result] = await pool.query(
    "SELECT d_vehicle_id FROM dclr_cargenie_host_vehicle WHERE d_vehicle_id=?",
    [id]
  );
  if (result.length !== 0) return true;
}

export async function get_vehicle_by_id(id) {
  try {
    const [result] = await pool.query(
      "SELECT * FROM dclr_cargenie_host_vehicle WHERE d_vehicle_id=?",
      [id]
    );

    return result;
  } catch (e) {
    throw e;
  }
}

export async function get_single_user_field(id, field) {
  try {
    const [result] = await pool.query(
      `SELECT ${field} FROM dclr_cargenie_users WHERE d_user_id=?`,
      [id]
    );

    return result[0];
  } catch (e) {
    throw e;
  }
}

//otp
export async function random_otp(userId) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    const sql =
      "INSERT INTO dclr_cargenie_otp(d_otp_pass,d_user_id, d_otp_tries) VALUES (?, ?,?)";
    await pool.query(sql, [otp, userId, 0]);

    return otp;
  } catch (e) {
    throw e;
  }
}

export async function update_otp(otp) {
  try {
    await pool.query(
      "UPDATE dclr_cargenie_otp SET d_otp_tries = 1 WHERE d_otp_pass=?",
      [otp]
    );
    return true;
  } catch (e) {
    throw e;
  }
}
// console.log(await does_user_exist_by_id("qEsbef"))
