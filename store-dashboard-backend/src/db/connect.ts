import mongoose from "mongoose";
import type { Mongoose } from "mongoose";

let connection: Mongoose | null = null;

export const connectToDB = async () => {
  try {
    if (connection) {
      return connection;
    }

    connection = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://root:example@localhost:27017",
      {
        dbName: "store-dashboard",
        authSource: "admin", // Needed when using root user
      }
    );
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
