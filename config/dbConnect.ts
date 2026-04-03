import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/mental_health";

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise =  await mongoose.connect(MONGODB_URI as string);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
