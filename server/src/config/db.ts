import mongoose from "mongoose";
import { env } from "./env";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(env.MONGODB_URI);
    console.log(`Mongodb is Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
