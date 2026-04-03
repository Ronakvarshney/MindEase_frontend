import { Types, Schema, models , model } from "mongoose";

interface BookingSchemaType {
  userId: Types.ObjectId;
  therapistId: Types.ObjectId;
  cause: string;
  contact: string;
  meetingMode: "online" | "offline";
  status: "requested" | "accepted" | "cancelled";
  meetingTime : string;

  scheduledAt: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<BookingSchemaType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  therapistId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  cause: {
    type: String,
    required: true,
    maxlength: 500,
  },

  contact: {
    type: String,
    required: true,
  },

  meetingMode: {
    type: String,
    enum: ["online", "offline"],
    default: "online",
    required: true,
  },

  meetingTime : {
    type : String
  },

  status: {
    type: String,
    enum: ["requested", "accepted", "cancelled"],
    default: "requested",
    required: true,
  },

  scheduledAt: {
    type: String,
    required: true,
  },
} , {timestamps : true});



export default models.Booking || model<BookingSchemaType>("Booking" , BookingSchema)