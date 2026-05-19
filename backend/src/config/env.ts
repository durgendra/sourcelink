import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  MONGODB_URI: z.string().default("mongodb://127.0.0.1:27017/sourcelink"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  ENABLE_MOCK_AI: z
    .string()
    .transform((value) => value !== "false")
    .default("true"),
  UPLOAD_DIR: z.string().default("uploads"),
  MAX_FILE_SIZE_MB: z.coerce.number().default(25)
});

export const env = envSchema.parse(process.env);
