import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // MUST be true for port 465
  auth: {
    user:"ronakvarshney7100@gmail.com",
    pass:"qzuljzdprbhwcqqq",
  },
});
