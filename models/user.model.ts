import mongoose, { Schema, Types, model, models } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "patient" | "therapist" | "admin";
  isVerified: boolean;
  username?: string;
  createdAt: Date;
  therapistProfile?: Types.ObjectId;
  bookings?: Types.ObjectId[];
  updatedAt: Date;
  mental_health_report: {
    risk_level: string;
    overall_summary: string;
    health_score: number;
  };
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["patient", "therapist", "admin"],
      default: "patient",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
    },
    therapistProfile: {
      type: Schema.Types.ObjectId,
      ref: "Therapist",
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],

    mental_health_report: {
      risk_level: {
        type: String,
      },
      overall_summary: {
        type: String,
      },
      health_score: {
        type: Number,
      },
    },
  },
  { timestamps: true },
);


export default models.User || model<IUser>("User", UserSchema);
