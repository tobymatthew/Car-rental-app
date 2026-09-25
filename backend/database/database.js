import mysql from "mysql";
import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config();

let params = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
};

export const pool = mysql2.createPool(params).promise();

export function create_database() {
  let con = mysql.createConnection(params);

  con.connect(function (err) {
    if (err) throw err;
    console.log("connected");
    if (err) throw err;
  });
}
