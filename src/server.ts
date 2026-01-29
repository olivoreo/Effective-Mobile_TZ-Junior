import app from "./app";
import { connectDB } from "./config/db";

const PORT = 3000;

const start = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
};

start();