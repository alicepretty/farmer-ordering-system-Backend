import { config } from "dotenv";
import mongoose from "mongoose";
config();

const env_uri = process.env.MONGO_DB_URI;
const db_uri: string = env_uri.replace("<password>", process.env.MONGO_DB_PWD);

const dbConnect = async () => {
  try {
    await mongoose.connect(db_uri);
    console.log("Database connected successfully.");
  } catch (error) {
    console.error(error);
  }
};

export default dbConnect;
