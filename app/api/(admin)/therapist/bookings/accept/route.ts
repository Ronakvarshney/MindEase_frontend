// first check before accept the dates of the reuquested booking with the current date

import { connectDB } from "@/config/dbConnect";
import therapistModel from "@/models/therapist.model";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { Select } from "radix-ui";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();

    const { id } = await params;
    if (!id)
      return NextResponse.json({
        message: "Therapist id not gets",
      });

    const therapist = await therapistModel
      .findOne({ user_id: id })
      .populate({
        path: "requested_bookings",
        match : {createdAt : {$gte : new Date()}},
        populate: {
          path: "userId",
          select: "name email",
        },
      })
      .populate({
        path: "accepted_bookings",
        match : {createdAt : {$gte : new Date()}},
        populate: {
          path: "userId",
          select: "name email",
        },
      });
    if (!therapist)
      return NextResponse.json({
        message: "therapist details not found",
      });
  } catch (error) {}
}
