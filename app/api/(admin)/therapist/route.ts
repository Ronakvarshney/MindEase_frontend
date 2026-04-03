import { connectDB } from "@/config/dbConnect";
import therapistModel from "@/models/therapist.model";
import { NextResponse } from "next/server";
import "@/models/user.model"

export async function GET() {
  try {
    await connectDB();

    const therapists = await therapistModel.find().populate({
      path: "userId",
      select: "-password",
    });


    return NextResponse.json(
      {
        message: "All therapists fetched",
        details: therapists,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET therapists error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
