import { z } from "zod";
import { FINDING_STATUSES, TASK_STATUSES } from "../types/finding.types";

export const updateFindingStatusSchema = z.object({
  status: z.enum(FINDING_STATUSES)
});

export const updateFindingSchema = z.object({
  status: z.enum(FINDING_STATUSES).optional(),
  suggestedFix: z.string().optional(),
  reason: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
  taskStatus: z.enum(TASK_STATUSES).optional()
});
