import { connectDB } from "@/config/dbConnect";
import bookingModel from "@/models/booking.model";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const user_id = req.headers.get("x-user-id");
    const user_role = req.headers.get("x-user-role");


    if (!user_id || !user_role) {
      return NextResponse.json(
        { message: "Unauthorized - Please login first" },
        { status: 401 },
      );
    }

    if (user_role !== "patient") {
      return NextResponse.json(
        { message: "Only patients can book therapists" },
        { status: 403 },
      );
    }

    const { fromdata, id } = await req.json();

    const { cause, mode, date, meeting_time, contact_info } = fromdata;

    if (!cause || !mode || !date || !meeting_time || !contact_info) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    if (!id) {
      return NextResponse.json(
        { message: "Therapist ID is required" },
        { status: 400 },
      );
    }

    const existsUser = await userModel.findById(user_id);
    if (!existsUser) {
      return NextResponse.json(
        { message: "User not found. Please login again." },
        { status: 404 },
      );
    }

    const therapistExists = await userModel
      .findOne({
        _id: id,
        role: "therapist",
      })
    
        console.log(therapistExists);


    if (!therapistExists) {
      return NextResponse.json(
        { message: "Therapist not found" },
        { status: 404 },
      );
    }


    const existingBooking = await bookingModel.findOne({
      therapistId: id,
      scheduledAt: date,
      meeting_time: meeting_time,
      // status: { $ne: "cancelled" },
    });

    if (existingBooking) {
      return NextResponse.json(
        { message: "This time slot is already booked" },
        { status: 409 },
      );
    }

    const booking = await bookingModel.create({
      userId: user_id,
      therapistId: id,
      cause: cause,
      meetingMode: mode,
      contact: contact_info,
      scheduledAt: date,
      meeting_time: meeting_time,
    });

    existsUser.bookings.push(booking._id);
    await existsUser.save();
    therapistExists.requested_bookings.push(booking._id);
    await therapistExists.save();

    return NextResponse.json(
      {
        message: "Booking successfully created",
        booking: {
          id: booking._id,
          scheduledAt: booking.scheduledAt,
          meeting_time: booking.meeting_time,
          therapist: {
            id: therapistExists._id,
            name: therapistExists.name,
          },
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Booking creation error:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { message: "Invalid data provided", error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error", error: error?.message },
      { status: 500 },
    );
  }
}
