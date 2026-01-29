import app from "./app";
import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

const start = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
};

start();