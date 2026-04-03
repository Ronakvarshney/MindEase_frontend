import { redisClient } from "@/config/redis";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(
  req: NextRequest
) {
  try {
    const { password , token } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Invalid or missing token/password" },
        { status: 400 }
      );
    }

    const cachedUserId = await redisClient.get(`reset_password_${token}`);
    if (!cachedUserId) {
      return NextResponse.json(
        { error: "Reset link expired or invalid" },
        { status: 410 }
      );
    }

    const user = await userModel.findById(cachedUserId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    await redisClient.del(`reset-password_${token}`);

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Reset Password Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
