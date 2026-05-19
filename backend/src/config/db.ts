import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "./logger";

export const connectDb = async () => {
  await mongoose.connect(env.MONGODB_URI);
  logger.info({ uri: env.MONGODB_URI.replace(/\/\/.*@/, "//***@") }, "MongoDB connected");
};

export const disconnectDb = async () => {
  await mongoose.disconnect();
};
