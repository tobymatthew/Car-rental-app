import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


let transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
        user: process.env.SENDBLUE_USER,
        pass: process.env.SENDBLUE_PASS,
      }
});



export async function otp_mail(otp, email_address, first_name) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "./html/otp.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();

  const template = handlebars.compile(source);

  const replacements = { otp: `${otp}`, firstname: `${first_name}` };

  const htmlToSend = template(replacements);


  let info = await transporter.sendMail({
    from: '"Cargenie" <' + process.env.SENDBLUE_USER + '>',
    to: `${email_address}`,
    subject: "OTP Verification",
    text: "otp - 1234",
    html: htmlToSend,
  });

  return true;
}

export async function WelcomeMail(first_name, email_address) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "./html/welcome.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();

  const template = handlebars.compile(source);

  const replacements = { firstname: `${first_name}` };

  const htmlToSend = template(replacements);

  let info = await transporter.sendMail({
    from: '"Cargenie" <' + process.env.SENDBLUE_USER + '>',
    to: `${email_address}`,
    subject: "Welcome To Cargenie",
    text: "Cargenie",
    html: htmlToSend,
  });

  return true;
}

export async function DeleteMail( email_address) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  console.log(email_address)

  const filePath = path.join(__dirname, "./html/delete.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();

  const template = handlebars.compile(source);

  const replacements = {  };

   const htmlToSend = template(replacements);

  let info = await transporter.sendMail({
    from: '"Cargenie" <' + process.env.SENDBLUE_USER + '>',
    to: `${email_address}`,
    subject: "We Are Sad To See You Go",
    text: "Cargenie",
    html: htmlToSend,
  });

  return true;
}
