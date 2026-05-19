import fs from "node:fs/promises";
import path from "node:path";
import mammoth from "mammoth";
import pdfParse from "pdf-parse";
import { AppError } from "../../middleware/errorHandler";
import { cleanText } from "./textCleaner.service";

export const parseDocument = async (filePath: string, mimeType: string) => {
  if (mimeType === "application/pdf") {
    const buffer = await fs.readFile(filePath);
    const result = await pdfParse(buffer);
    return { rawText: cleanText(result.text), metadata: { pages: result.numpages } };
  }

  if (mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const result = await mammoth.extractRawText({ path: filePath });
    return { rawText: cleanText(result.value), metadata: {} };
  }

  if (mimeType === "text/plain") {
    const content = await fs.readFile(filePath, "utf8");
    return { rawText: cleanText(content), metadata: {} };
  }

  if (mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || path.extname(filePath) === ".pptx") {
    return { rawText: "PPTX parsing placeholder for V1", metadata: { placeholder: true } };
  }

  throw new AppError("UNSUPPORTED_FILE_TYPE", "Allowed file types: pdf, docx, pptx, txt", 400);
};
