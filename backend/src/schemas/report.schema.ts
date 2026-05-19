import { z } from "zod";

export const createReportSchema = z.object({
  sourceUpdateEventId: z.string().min(1),
  format: z.enum(["json", "csv", "pdf", "docx"])
});
