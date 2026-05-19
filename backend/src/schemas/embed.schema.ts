import { z } from "zod";
import { EMBED_TYPES, UPDATE_MODES } from "../types/embed.types";

export const generateEmbedSchema = z.object({
  sourceObjectId: z.string().min(1),
  embedType: z.enum(EMBED_TYPES).default("inline_html"),
  updateMode: z.enum(UPDATE_MODES).default("review-required")
});
