import { z } from "zod";

export const detectUsageSchema = z.object({
  sourceObjectIds: z.array(z.string()).optional()
});
