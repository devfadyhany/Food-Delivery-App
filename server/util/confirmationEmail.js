import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
});

export const SendConfirmationEmail = async (userEmail, token) => {
  const mailOptions = {
    from: process.env.NODEMAILER_AUTH_USER,
    to: userEmail,
    subject: "Confirm Your Email",
    text: `Welcome To Food-Delivery
    please, confirm your email by clicking here ${process.env.CONFIRMATION_ROUTE}/${token}`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ` + info.response);
    }
  });
};
