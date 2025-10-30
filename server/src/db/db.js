import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = `mongodb+srv://root:${process.env.MONGO_PASSWORD}@cluster0.869bgbn.mongodb.net/`;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {});
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.log("❌ MongoDB Connection Failed:", error.message);
  }
};

export default connectDB;
