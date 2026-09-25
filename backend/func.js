import bcrypt from "bcrypt";
import { pool } from "./database/database.js";
import {
  random_user_id,
  random_vehicle_id,
  does_user_exist,
  hashPassword,
  does_user_exist_by_id,
} from "./user.js";

export async function create_admin_user(
  first_name,
  last_name,
  password,
  email
) {
  if (await does_user_exist(email)) return false;
  try {
    const sql =
      "INSERT INTO dclr_cargenie_users(d_first_name, d_last_name, d_user_id, d_password, d_email, d_email_verified, d_is_license_verified) VALUES(?,?,?,?,?,?,?)";
    await pool.query(sql, [
      first_name,
      last_name,
      await random_user_id(6),
      await hashPassword(password),
      email,
      0,
      0,
    ]);
    return true;
  } catch (e) {
    throw e;
    console.log(e);
  }
}

export async function getUserInfoByEmail(email) {
  if (await does_user_exist(email)) {
    const [result] = await pool.query(
      "SELECT d_first_name, d_last_name, d_user_id, d_email, d_phone_number FROM dclr_cargenie_users WHERE d_email=?",
      [email]
    );

    return result[0];
  } else {
    return { msg: "User does not exist" };
  }
}

export async function getUserInfoById(userId) {
  const [result] = await pool.query(
    "SELECT d_first_name, d_last_name, d_user_id, d_email, d_phone_number,d_profile_photo, d_email_verified, d_is_license_verified FROM dclr_cargenie_users WHERE d_user_id=?",
    [userId]
  );

  return result[0];
}

export async function authenticateUser(email, password) {
  const [result] = await pool.query(
    "SELECT d_email, d_password FROM dclr_cargenie_users WHERE d_email=?",
    [email]
  );
  if (result.length !== 0) {
    let is_password_true = await bcrypt.compare(password, result[0].d_password);

    if (is_password_true === true) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export async function profilePicUpdate(profileImage, id) {
  try {
    const result = await pool.query(
      "UPDATE dclr_cargenie_users SET d_profile_photo = ? WHERE d_user_id = ?",
      [profileImage, id]
    );

    return true;
  } catch (err) {
    return false;
  }
}

export async function update_timestamp(email) {
  try {
    await pool.query(
      "UPDATE dclr_cargenie_users SET d_last_signed_in = NOW() WHERE d_email = ?",
      [email]
    );
  } catch (err) {
    throw err;
  }
}

export async function update_first_name(id, update_name) {
  try {
    await pool.query(
      "UPDATE dclr_cargenie_users SET d_first_name = ? WHERE d_user_id = ?",
      [update_name, id]
    );
  } catch (err) {
    throw err;
  }
}

export async function update_last_name(id, last_name) {
  try {
    await pool.query(
      "UPDATE dclr_cargenie_users SET d_last_name = ? WHERE d_user_id = ?",
      [last_name, id]
    );
  } catch (err) {
    throw err;
  }
}

export async function is_otp_valid(id, otp) {
  const [result] = await pool.query(
    "SELECT * FROM dclr_cargenie_otp WHERE d_user_id=? AND d_otp_pass=? AND d_otp_tries=0",
    [id, otp]
  );
  if (result.length !== 0) return true;
}

export async function verify_otp(id, otp) {
  try {
    await pool.query(
      "UPDATE dclr_cargenie_otp SET d_otp_tries=1 WHERE d_user_id=? AND d_otp_pass=?",
      [id, otp]
    );
    await pool.query(
      "UPDATE dclr_cargenie_users SET d_email_verified=1 WHERE d_user_id=?",
      [id]
    );
  } catch (err) {
    throw err;
  }
}

export async function verify_drivers_license(id) {
  try {
    await pool.query(
      "UPDATE dclr_cargenie_users SET d_is_license_verified=1 WHERE d_user_id=?",
      [id]
    );
  } catch (err) {
    throw err;
  }
}

export async function update_phone_number(id, phone_number) {
  try {
    await pool.query(
      "UPDATE dclr_cargenie_users SET d_phone_number = ? WHERE d_user_id = ?",
      [phone_number, id]
    );
  } catch (err) {
    throw err;
  }
}

export async function update_bvn_number(id, bvn_number) {
  try {
    await pool.query(
      "UPDATE dclr_cargenie_users SET d_bvn = ? WHERE d_user_id = ?",
      [bvn_number, id]
    );
      await pool.query(
      "UPDATE dclr_cargenie_users SET d_bvn_verified=1 WHERE d_user_id=?",
      [id]
    );
  } catch (err) {
    throw err;
  }
}

export async function update_nin_number(id, nin_number) {
  try {
    await pool.query(
      "UPDATE dclr_cargenie_users SET d_nin = ? WHERE d_user_id = ?",
      [nin_number, id]
    );

      await pool.query(
      "UPDATE dclr_cargenie_users SET d_nin_verified=1 WHERE d_user_id=?",
      [id]
    );
  } catch (err) {
    throw err;
  }
}

// export async function update_nin_number(id, nin_number) {
//   try {
//     await pool.query(
//       "UPDATE dclr_cargenie_users SET d_nin = ? WHERE d_user_id = ?",
//       [nin_number, id]
//     );
//   } catch (err) {
//     throw err;
//   }
// }
// This function will make a user a host too once completed
export async function listVehicle(
  user_id,
  vehicle_make,
  vehicle_type,
  number_of_seats,
  year_of_make,
  colour,
  transmission,
  odometer,
  is_bluetooth,
  is_wheel_chair,
  is_gps,
  is_usb,
  is_heated,
  is_bike,
  is_child,
  is_keyless,
  is_back_camera,
  is_navigation,
  price,
  pickup_location,
  dropoff_location,
  proof_of_own_number,
  proof_of_own_photo,
  vehicle_registration,
  certificate_of_road,
  insurance,
  front_view_image,
  back_view_image,
  right_side_image,
  left_side_image,
  dashboard_view_image,
  front_seat_image,
  back_seat_image,
  trunk_view_image
) {
  try {
    const sql = `INSERT INTO dclr_cargenie_host_vehicle
            (d_vehicle_id,d_user_id,d_vehicle_make,d_vehicle_type,d_number_of_seats,d_year_of_make,
            d_colour,d_transmission,d_odometer,d_is_bluetooth,d_is_wheel_chair,d_is_gps,d_is_usb,
            d_is_heated,d_is_bike,d_is_child,d_is_keyless,d_is_back_camera,d_is_navigation,d_price,d_pickup_location,
            d_dropoff_location,d_proof_of_own_number,d_proof_of_own_photo,d_certificate_of_road,d_insurance,
            d_vehicle_registration,d_front_view_image,d_back_view_image,d_right_side_image,d_left_side_image,
            d_dashboard_view_image,d_front_seat_image,d_back_seat_image,d_trunk_view_image,d_approved_for_listing
           )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    await pool.query(sql, [
      await random_vehicle_id(6),
      user_id,
      vehicle_make,
      vehicle_type,
      number_of_seats,
      year_of_make,
      colour,
      transmission,
      odometer,
      is_bluetooth,
      is_wheel_chair,
      is_gps,
      is_usb,
      is_heated,
      is_bike,
      is_child,
      is_keyless,
      is_back_camera,
      is_navigation,
      price,
      pickup_location,
      dropoff_location,
      proof_of_own_number,
      proof_of_own_photo,
      vehicle_registration,
      certificate_of_road,
      insurance,
      front_view_image,
      back_view_image,
      right_side_image,
      left_side_image,
      dashboard_view_image,
      front_seat_image,
      back_seat_image,
      trunk_view_image,
      0,
    ]);

    //Make user host here if successfulll 37

    await pool.query(
      "UPDATE dclr_cargenie_users SET d_is_user_host = TRUE WHERE d_user_id=?",
      [user_id]
    );
  } catch (err) {
    throw err;
  }
}

export async function hostAccDetails(user_id, acc_no, acc_name, bank_name) {
  try {
    const sql = `INSERT INTO dclr_cargenie_users_acc
            (d_user_id,d_user_acc_no,d_user_acc_name,d_user_bank) VALUES (?,?,?,?)`;

    const [result] = await pool.query(sql, [
      user_id,
      acc_no,
      acc_name,
      bank_name,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
}

export async function fetch_all_accounts(user_id) {
  try {
    const sql = "SELECT * FROM dclr_cargenie_users_acc WHERE d_user_id=?";

    const [result] = await pool.query(sql, [user_id]);
    return result;
  } catch (err) {
    throw err;
  }
}

export async function rate_vehicle(user_id, vehicle_id, comment, ratings) {
  try {
    const sql =
      "INSERT INTO dclr_cargenie_rating(d_user_id,d_vehicle_id,d_comment,d_rating) VALUES (?,?,?,?)";

    await pool.query(sql, [user_id, vehicle_id, comment, ratings]);

    const sql2 =
      "UPDATE dclr_cargenie_rating SET d_rating = (d_rating+?)/2 WHERE d_vehicle_id=?";
    await pool.query(sql2, [ratings, vehicle_id]);
  } catch (err) {
    throw err;
  }
}

export async function get_host_vehicles(user_id) {
  try {
    const sql = "SELECT * FROM dclr_cargenie_host_vehicle WHERE d_user_id=?";

    const [result] = await pool.query(sql, [user_id]);

    return result;
  } catch (err) {
    throw err;
  }
}

export async function get_ratings_of_vehicle(vehicle_id) {
  try {
    const sql = "SELECT * FROM dclr_cargenie_rating WHERE d_vehicle_id=?";

    const [result] = await pool.query(sql, [vehicle_id]);

    return result;
  } catch (err) {
    throw err;
  }
}

export async function reset_password(user_id, new_password) {
  try {
    const hash_new_password = await bcrypt.hash(new_password, 10);

    const [result] = await pool.query(
      "UPDATE dclr_cargenie_users SET d_password = ? WHERE d_user_id=?",
      [hash_new_password, user_id]
    );
  } catch (err) {
    throw err;
  }
}

export async function delete_account(user_id) {
  try {

    const sql = ""

    // const sql = "DELETE A.*, B.*, C.*, D.*, E.*, F.*, G.*, H.*, I.*
    // FROM dclr_cargenie_users_acc AS A

    // INNER JOIN dclr_cargenie_users AS B
    // ON B.d_user_id = A.d_user_id

    // INNER JOIN dclr_cargenie_trips AS C
    // ON B.d_user_id = C.d_user_id

    // INNER JOIN dclr_cargenie_request AS D
    // ON D.d_user_id = C.d_user_id

    // INNER JOIN dclr_cargenie_rating AS E
    // ON E.d_user_id = C.d_user_id

    // INNER JOIN dclr_cargenie_otp AS F
    // ON F.d_user_id = C.d_user_id

    // INNER JOIN dclr_cargenie_notification AS G
    // ON G.d_user_id = C.d_user_id

    // INNER JOIN dclr_cargenie_log AS H
    // ON H.d_user_id = C.d_user_id

    // INNER JOIN dclr_cargenie_host_vehicle AS I
    // ON I.d_user_id = C.d_user_id

    // WHERE A.d_user_id = 'user id to delete'";

    const [result] = await pool.query(sql, [user_id]);

    return result;

  } catch (err) {
    throw err;
  }
}

export async function is_vehicle_active(user_id){

  try {
    const sql = `SELECT * FROM dclr_cargenie_trips WHERE d_user_id=? AND d_complete=0 AND d_status=?`;

    const [result] = await pool.query(sql, [user_id, "approved"]);
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
}

export async function is_user_host(user_id){

  try {
    const sql = `SELECT * FROM dclr_cargenie_users WHERE d_user_id=? AND d_is_user_host=1`;

    const [result] = await pool.query(sql, [user_id]);

    if (result.length !== 0) return true;
  } catch (err) {
    throw err;
  }
}

// console.log( await getUserInfoById("qEsbef"))
