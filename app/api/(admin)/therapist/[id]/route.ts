import { connectDB } from "@/config/dbConnect";
import therapistModel from "@/models/therapist.model";
import { NextRequest, NextResponse } from "next/server";
import "@/models/user.model"


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Id not found" },
        { status: 400 }
      );
    }

    await connectDB();

    const therapist = await therapistModel
      .findById(id)
      .populate({
        path: "userId",
        select: "-password",
      })

    if (!therapist) {
      return NextResponse.json(
        { message: "Therapist details not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Details found",
        details: therapist,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET therapist error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
