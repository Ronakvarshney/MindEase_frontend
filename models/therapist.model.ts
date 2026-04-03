import mongoose, { Schema, Types, model, models } from "mongoose";

interface ITherapist {
  userId: Types.ObjectId;

  specialization: string[];
  experienceYears: number;
  bio: string;
  profileImage: string;

  consultationFee: number;
  role: string;

  availability: {
    day: string[];
    slots: string[];
  }[];

  requested_bookings: Types.ObjectId[];
  accepted_bookings: Types.ObjectId[];

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const TherapistSchema = new Schema<ITherapist>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one user = one therapist profile
    },

    profileImage: {
      type: String,
    },
    role: { type: String, required: true },

    specialization: {
      type: [String],
      required: true,
    },

    experienceYears: {
      type: Number,
      min: 0,
      required: true,
    },

    bio: {
      type: String,
      maxlength: 1000,
    },

    consultationFee: {
      type: Number,
      required: true,
    },

    availability: [
      {
        day: {
          type: String,
          required: true,
        },
        slot: {
          type: String,
          required: true,
        },
      },
    ],

    requested_bookings: [
      {
        type: Schema.Types.ObjectId ,
        ref: "Booking",
      },
    ],

    accepted_bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default models.Therapist ||
  model<ITherapist>("Therapist", TherapistSchema);
