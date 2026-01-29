import mongoose from "mongoose";

export const connectDB = async () => {
await mongoose.connect("mongodb://localhost:27017/users_db");
console.log("DB connected");
};