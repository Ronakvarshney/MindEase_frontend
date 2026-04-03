import { connectDB } from "@/config/dbConnect";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { redisClient } from "@/config/redis";
import { transporter } from "@/config/Email";
import { forgotPasswordTemplate } from "@/lib/forgot.password";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email are required" },
        { status: 400 },
      );
    }

    const user = await userModel.findOne({ email }).select("name , email");
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist. Please sign up first." },
        { status: 404 },
      );
    }

    const token = crypto.randomBytes(32).toString("hex");

    const verifyLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    transporter.verify((error, success) => {
      if (error) {
        console.error("SMTP Error:", error);
      } else {
        console.log("SMTP Server is ready to send emails");
      }
    });
    await transporter.sendMail({
      from: "ronakvarshney7100@gmail.com",
      to: email,
      subject: "Reset Password Link",
      html: forgotPasswordTemplate(verifyLink, user?.name),
    });

    await redisClient.set(
      `reset_password_${token}`,
      `${user._id}`,
      "EX",
      300,
    );

    return NextResponse.json(
      {
        message: "Forgot-password email sent successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
