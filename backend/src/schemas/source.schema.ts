import { z } from "zod";
import { CHANGE_TYPES, SOURCE_OBJECT_TYPES } from "../types/source.types";
import { SEVERITIES } from "../types/finding.types";

export const createSourceSchema = z.object({
  name: z.string().min(1),
  objectType: z.enum(SOURCE_OBJECT_TYPES),
  ownerName: z.string().min(1),
  ownerDomain: z.string().min(1),
  canonicalUrl: z.string().url(),
  sourceText: z.string().min(1),
  version: z.string().min(1),
  scope: z.record(z.any()).default({})
});

export const createSourceVersionSchema = z.object({
  version: z.string().min(1),
  sourceText: z.string().min(1),
  sourceUrl: z.string().url().optional(),
  manifest: z.record(z.any()).optional()
});

export const updateSourceSchema = z.object({
  newVersion: z.string().min(1),
  sourceText: z.string().min(1),
  changeType: z.enum(CHANGE_TYPES),
  severity: z.enum(SEVERITIES),
  summary: z.string().min(1)
});
