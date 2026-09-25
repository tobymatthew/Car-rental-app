import express from "express";
import fileUpload from "express-fileupload";
import exhbs from "express-handlebars";
import { create_database } from "./database/database.js";
import {
  does_user_exist,
  random_otp,
  does_user_exist_by_id,
  does_vehicle_exist_by_id,
  get_single_user_field,
  is_deleted_acct,
} from "./user.js";
import {
  create_admin_user,
  authenticateUser,
  getUserInfoByEmail,
  update_last_name,
  listVehicle,
  hostAccDetails,
  fetch_all_accounts,
  getUserInfoById,
  profilePicUpdate,
  update_timestamp,
  update_first_name,
  get_host_vehicles,
  update_phone_number,
  // update_bvn_number,
  // update_nin_number,
  rate_vehicle,
  get_ratings_of_vehicle,
  reset_password,
  is_otp_valid,
  verify_otp,
  delete_account,
  is_vehicle_active,
  is_user_host,
  update_bvn_number,
} from "./func.js";

import { DeleteMail, otp_mail, WelcomeMail } from "./email/mail.js";
import request from "request";
import dotenv from "dotenv";
import notificationRoutes from "./routes/notification.route.js";
import tripRoutes from "./routes/trips.route.js";
import adminRoutes from "./routes/admin.route.js";
import { update_user, update_vehicle } from "./helpers/admin.helpers.js";
import { Vonage } from "@vonage/server-sdk";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

app.use(express.json());
app.use(fileUpload());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

create_database();

app.get("/api", async (req, res) => {
  res.json({ msg: "Welcome to Cargenie" });
});

app.use("/api/notification", notificationRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/get_user_by_email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    if (await does_user_exist(email)) {
      res.json({ data: await getUserInfoByEmail(email) });
    } else {
      res.json({ msg: "email_does_not_exist" });
    }
  } catch (err) {
    console.log("this is error", err);
    res.json({ msg: "Error_occured" });
  }
});

app.get("/api/get_user_by_id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (await does_user_exist_by_id(id)) {
      res.json({ data: await getUserInfoById(id) });
    } else {
      res.json({ msg: "id_does_not_exist" });
    }
  } catch (err) {
    res.json(err);
    res.json({ msg: "Error_occured" });
  }
});

app.post("/api/signup", async (req, res) => {
  try {
    const { first_name, last_name, password, email } = req.body;

    if (await does_user_exist(email)) {
      res.json({ msg: "email_already_exist" });
    } else {
      const result = await create_admin_user(
        first_name,
        last_name,
        password,
        email
      );

      await WelcomeMail(first_name, email);
      const user = await getUserInfoByEmail(email);
      const otp = await random_otp(user.d_user_id);

      await otp_mail(otp, email, first_name);
      res.json({ data: user });
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err: err });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const deleted_acct = await is_deleted_acct(email);
    if (deleted_acct) {
      return res.json({ msg: "Account deleted" });
    }
    if (!(await authenticateUser(email, password))) {
      res.json({ msg: "incorrect_email_or_password" });
    } else {
      await update_timestamp(email);
      res.json({ data: await getUserInfoByEmail(email) });
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err: err });
  }
});

app.post("/api/request_otp", async (req, res) => {
  try {
    const { email, userId } = req.body;

    const otp = await random_otp(userId);
    const user = await getUserInfoById(userId);

    const send_otp = await otp_mail(otp, email, user.d_first_name);

    if (send_otp) {
      res.json({ otp, email });
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err });
  }
});

app.post("/api/verify_otp", async (req, res) => {
  try {
    const { otp, userId } = req.body;
    if (typeof otp === "undefined") {
      res.json({ msg: "otp_wasnt_provided" });
    } else if (typeof userId === "undefined") {
      res.json({ msg: "userid_wasnt_provided" });
    } else {
      if (await is_otp_valid(userId, otp)) {
        await verify_otp(userId, otp);
        res.json({ msg: "otp verified" });
      } else {
        res.json({ msg: "otp isnt valid" });
      }
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err: err });
  }
});

app.post("/api/password_reset/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const { new_password } = req.body;

    if (user_id === "undefined" || user_id === null) {
      res.json({ msg: "user_id_wasnt_provided" });
    } else if (typeof new_password === "undefined") {
      res.json({ msg: "new_password_wasnt_provided" });
    } else {
      if (await does_user_exist_by_id(user_id)) {
        await reset_password(user_id, new_password);
        res.json({ msg: "password_reset_successfull" });
      } else {
        res.json({ msg: "user_id_does_not_exist" });
      }
    }
  } catch (err) {
    res.json({ msg: "Error_occured" });
  }
});

app.put("/api/update_profile_pic/:id", async (req, res) => {
  const id = req.params.id;

  const { profileImage } = req.body;

  const user = await does_user_exist_by_id(id);

  try {
    if (typeof profileImage === "undefined") {
      res.json({ msg: "image_wasnt_provided" });
    } else if (typeof id === "undefined") {
      res.json({ msg: "user_id_wasnt_provided" });
    } else {
      if (user) {
        const result = await profilePicUpdate(profileImage, id);
        res.json({ msg: "profile_pic_updated" });
      } else {
        res.json({ msg: "user_id_does_not_exist" });
      }
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err: err });
  }
});

app.delete("/api/user/delete/:id", async (req, res) => {
  const id = req.params.id;
  const { query, value, vehicle_query, vehicle_value } = req.body;

  const user = await does_user_exist_by_id(id);
  const is_host = await is_user_host(id);

  try {
    if (typeof id === "undefined") {
      res.json({ msg: "user_id_wasnt_provided" });
    } else {
      if (user) {
        if (is_host) {
          const vehicle_active = await is_vehicle_active(id);
          if (vehicle_active.length !== 0) {
            res.json({ msg: "You have a running trip" });
            console.log("this is vehicle", vehicle_active);
          }
          const host_vehicles = await get_host_vehicles(id);
          host_vehicles.map(
            async (vehicle) =>
              await update_vehicle(
                vehicle_query,
                vehicle_value,
                vehicle.d_vehicle_id
              )
          );
          await update_user(query, value, id);
          const user = await getUserInfoById(id);
          await DeleteMail(user.d_email);
          res.json({ msg: "account_deleted" });
        } else {
          await update_user(query, value, id);
          const user = await getUserInfoById(id);
          console.log("this is user", user);
          await DeleteMail(user.d_email);
          res.json({ msg: "account_deleted" });
        }
      } else {
        res.json({ msg: "user_id_does_not_exist" });
      }
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err: err });
  }
});

app.put("/api/update_phone_number/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const { phone_number } = req.body;
    if (typeof phone_number === "undefined") {
      res.json({ msg: "phone_number_wasnt_provided" });
    } else if (typeof user_id === "undefined") {
      res.json({ msg: "id_wasnt_provided" });
    } else {
      if (await does_user_exist_by_id(user_id)) {
        await update_phone_number(user_id, phone_number);
        res.json({ msg: "phone_number_updated" });
      } else {
        res.json({ msg: "user_id_does_not_exist" });
      }
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err: err });
  }
});

app.post("/api/verify_and_update_bvn_number/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const { bvn_number } = req.body;

    if (typeof bvn_number === "undefined") {
      res.json({ msg: "bvn_number_wasnt_provided" });
    } else if (typeof user_id === "undefined") {
      res.json({ msg: "id_wasnt_provided" });
    } else {
      if (await does_user_exist_by_id(user_id)) {
        const options = {
          method: "POST",

          // host: 'api.myidentitypay.com',
          // port: 8080,
          // path: 'api/v2/biometrics/merchant/data/verification/bvn_nin_phone',
          uri: "https://api.myidentitypass.com/api/v2/biometrics/merchant/data/verification/bvn",
          // uri: "https://api.myidentitypay.com/api/v2/biometrics/merchant/data/verification/bvn_nin_phone",

          headers: {
            "x-api-key": process.env.SENDBLUE_API_KEY,
            "app-id": "328c4d27-b2ca-42c7-b9a8-f672561f0224",
            Cookie: "cookiesession1=678A3E69197210AE369EA1D24C9C2D44",
          },
          formData: {
            number: bvn_number,
          },
        };
        request(options, async function (error, response) {
          if (error) {
            console.log("error....... ", error);
          }

          console.log("My response", JSON.parse(response.body));
          if (JSON.parse(response.body).status === true) {
            await update_bvn_number(user_id, bvn_number);
            res.json({ msg: "bvn_number_verified_and_updated" });
          } else {
            res.json({ msg: "not_a_valid_bvn_number" });
          }
        });
      } else {
        res.json({ msg: "user_id_does_not_exist" });
      }
    }
  } catch (err) {
    res.json({ msg: "Error_occured" });
  }
});

app.put("/api/update_first_name/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { first_name } = req.body;
    if (typeof first_name === "undefined") {
      res.json({ msg: "name_wasnt_provided" });
    } else if (typeof id === "undefined") {
      res.json({ msg: "id_wasnt_provided" });
    } else {
      if (await does_user_exist_by_id(id)) {
        await update_first_name(id, first_name);
        res.json({ msg: "first_name_updated" });
      } else {
        res.json({ msg: "user_id_does_not_exist" });
      }
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err: err });
  }
});

app.put("/api/update_last_name/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { last_name } = req.body;
    if (typeof last_name === "undefined") {
      res.json({ msg: "name_wasnt_provided" });
    } else if (typeof id === "undefined") {
      res.json({ msg: "id_wasnt_provided" });
    } else {
      if (await does_user_exist_by_id(id)) {
        await update_last_name(id, last_name);
        res.json({ msg: "last_name_updated" });
      } else {
        res.json({ msg: "user_id_does_not_exist" });
      }
    }
  } catch (err) {
    res.json({ msg: "Error_occured" });
  }
});

app.post("/api/verify_and_update_phone_number/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const { phone_number } = req.body;
    console.log(phone_number);
    console.log(user_id);
    if (!phone_number) {
      console.log();
      res.json({ msg: "phone_number_wasnt_provided" });
    } else if (user_id === "undefined") {
      res.json({ msg: "id_wasnt_provided" });
    } else {
      console.log(await does_user_exist_by_id(user_id));
      if (await does_user_exist_by_id(user_id)) {
        const from = "Cargenie Verify";
        const to = phone_number;
        const text = "A text message sent using the Vonage SMS API";

        console.log(text);

        const resp = await vonage.numberInsights.basicLookup(phone_number);
        console.log(resp);
        // const sendSMS = await vonage.sms.send({ to, from, text });
        // console.log(sendSMS);
        const sendSMS = async () => {
          // await vonage.sms
          //   .send({ to, from, text })
          //   .then((res) => {
          //     console.log("Message sent successfully");
          //     console.log(res);
          //   })
          //   .catch((err) => {
          //     console.log("There was an error sending the messages.");
          //     console.error(err);
          //   });
          await vonage.verify
            .start({
              number: phone_number,
              brand: "Cargenie",
            })
            .then((resp) => console.log(resp.request_id))
            .catch((err) => console.error(err));
        };
        if (resp.status_message === "Success") {
          sendSMS();
          await vonage.verify
            .start({
              number: phone_number,
              brand: "Cargenie",
            })
            .then(async (resp) => {
              console.log(resp.request_id);
              await update_phone_number(user_id, phone_number);
              res.json({
                msg: "phone_number_verified_and_updated",
                req_id: resp.request_id,
              });
            })
            .catch((err) => console.error(err));
        } else {
          res.json({ msg: "not_a_valid_number" });
        }
        // res.send("Route hit");
      } else {
        res.json({ msg: "user_id_does_not_exist" });
      }
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err });
  }
});

app.post("/api/verify_phone_otp", async (req, res) => {
  const { otp, request_id } = req.body;
  try {
    if (!request_id) {
      res.json({ msg: "userid_wasnt_provided" });
    } else if (!otp) {
      res.json({ msg: "otp_wasnt_provided" });
    } else {
      vonage.verify
        .check(request_id, otp)
        .then((resp) => {
          console.log(resp);
          res.json({ msg: "otp number verified" });
        })
        .catch((err) => {
          console.error(err);
          vonage.verify
            .cancel(otp)
            .then((resp) => console.log(resp))
            .catch((err) => console.error(err));
        });
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err: err });
  }
});

app.post("/api/verify_drivers_license/:id", async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      res.json({ msg: "userid_wasnt_provided" });
    } else {
      await verify_drivers_license(userId);
      res.json({ msg: "drivers_license verified" });
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err: err });
  }
});

app.get("/api/get_user_field", async (req, res) => {
  const { userId, field } = req.body;
  try {
    if (!userId) {
      res.json({ msg: "userid_wasnt_provided" });
    } else {
      const data = await get_single_user_field(userId, field);
      res.json({ msg: "drivers_license verified", data });
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err: err });
  }
});

app.post("/api/host_list_car/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const {
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
    } = req.body;

    if (await does_user_exist_by_id(user_id)) {
      await listVehicle(
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
      );

      res.json({ msg: "vehicle_listed" });
    } else {
      res.json({ msg: "user_id_does_not_exist" });
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err });
  }
});

// app.post("/api/acc_details/:id", async (req, res) => {
//   try {
//     const user_id = req.params.id;
//     const {
//       acc_no,
//       acc_name,
//       bank_name,
//     } = req.body;

//     if (await does_user_exist_by_id(user_id)) {
//       const result = await hostAccDetails(
//         user_id,
//         acc_no,
//         acc_name,
//         bank_name,
//       );

//       res.json({ msg: "Account details saved", result });

//       // const result = await get_all_host_vehicles();
//     } else {
//       res.json({ msg: "Account details already exist"});
//     }
//   } catch (err) {
//     res.json({ msg: "Error_occured", err });
//   }
// });

app.post("/api/acc_details/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const { acc_no, acc_name, bank_name } = req.body;

    if (await does_user_exist_by_id(user_id)) {
      await hostAccDetails(user_id, acc_no, acc_name, bank_name);
      return res.status(200).json({
        msg: "Account added successfully",
        data: await fetch_all_accounts(user_id),
      });
    } else {
      res.json({ msg: "User doesn't exist" });
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err });
  }
});

app.post("/api/rate_vehicle/", async (req, res) => {
  try {
    const { user_id, vehicle_id, comment, ratings } = req.body;
    if (await does_user_exist_by_id(user_id)) {
      if (await does_vehicle_exist_by_id(vehicle_id)) {
        await rate_vehicle(user_id, vehicle_id, comment, ratings);

        res.json({ msg: "rating_succesful" });
      } else {
        res.json({ msg: "vehicle_id_does_not_exist" });
      }
    } else {
      res.json({ msg: "user_id_does_not_exist" });
    }
  } catch (err) {
    res.json({ msg: "Error_occured", err: err });
  }
});

app.get("/api/get_host_vehicles/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    if (await does_user_exist_by_id(user_id)) {
      const result = await get_host_vehicles(user_id);
      result.length === 0
        ? res.json("No vehicle with that id")
        : res.json(result);
    } else {
      res.json({ msg: "user_id_does_not_exist" });
    }
  } catch (err) {
    {
      res.json({ msg: "Error_occured" });
    }
  }
});

app.get("/api/get_ratings_of_vehicle/:id", async (req, res) => {
  try {
    const vehicle_id = req.params.id;

    if (await does_vehicle_exist_by_id(vehicle_id)) {
      const result = await get_ratings_of_vehicle(vehicle_id);

      res.json(result);
    } else {
      res.json({ msg: "vehicle_id_does_not_exist" });
    }
  } catch (err) {
    {
      res.json({ msg: "Error_occured" });
    }
  }
});

app.post("/api/filter_vehicles", async (req, res) => {});

app.post("/api/trip_request", async (req, res) => {});

app.listen(port, async () => {
  console.log(`App listening on port ${port}!`);
});
