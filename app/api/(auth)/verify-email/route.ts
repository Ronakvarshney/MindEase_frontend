import { connectDB } from "@/config/dbConnect";
import { redisClient } from "@/config/redis";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "Token not found" },
        { status: 400 }
      );
    }

    const user_id = await redisClient.get(`email_verify_${token}`);
    console.log(user_id)

    if (!user_id) {
      return NextResponse.json(
        { message: "Link has expired or is invalid" },
        { status: 410 }
      );
    }

    const user = await userModel.findById(user_id);

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { message: "Email already verified" },
        { status: 200 }
      );
    }

    user.isVerified = true;
    await user.save();

    // IMPORTANT: one-time use
    await redisClient.del(`verify_email_${token}`);

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify email error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
