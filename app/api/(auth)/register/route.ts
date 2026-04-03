import { connectDB } from "@/config/dbConnect";
import { transporter } from "@/config/Email";
import { redisClient } from "@/config/redis";
import { verifyEmailTemplate } from "@/lib/email.verify";
import therapistModel from "@/models/therapist.model";
import userModel from "@/models/user.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const {
      name,
      email,
      password,
      role,
      specialization,
      bio,
      experience,
      active,
      fees,
      time,
      day,
      therapist_role,
    } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Provide all credentials, Please.." },
        { status: 401 },
      );
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const username = email + crypto.randomBytes(32).toString("hex");

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      username: username,
    });

    if (role == "therapist") {
      if (
        !specialization ||
        !bio ||
        !active ||
        !day ||
        !time ||
        !experience ||
        !fees ||
        !therapist_role
      ) {
        return NextResponse.json(
          { error: "Provide all credentials, Please.." },
          { status: 401 },
        );
      }
      await therapistModel.create({
        userId: user._id,
        specialization: specialization,
        bio: bio,
        experienceYears: experience,
        isActive: active === "true" ? true : false,
        consultationFee: fees,
        role: therapist_role,
        availability: {
          day,
          slot: time,
        },
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    await redisClient.set(
      `email_verify_${token}`,
      user._id.toString(),
      "EX",
      300,
    );

    const verifyLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

    await transporter.verify();
    await transporter.sendMail({
      from: "ronakvarshney7100@gmail.com",
      to: email,
      subject: "Verify your email",
      html: verifyEmailTemplate(verifyLink, name),
    });

    return NextResponse.json(
      {
        message: "Registration successful. Please verify your email.",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
