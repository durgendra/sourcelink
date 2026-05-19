import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { env } from "../config/env";
import { AppError } from "./errorHandler";

const allowedMimeTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain"
]);

const uploadDirectory = path.resolve(process.cwd(), env.UPLOAD_DIR);
fs.mkdirSync(uploadDirectory, { recursive: true });

export const upload = multer({
  dest: uploadDirectory,
  limits: {
    fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024
  },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      cb(new AppError("UNSUPPORTED_FILE_TYPE", "Allowed file types: pdf, docx, pptx, txt", 400));
      return;
    }

    cb(null, true);
  }
});
