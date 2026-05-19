import { z } from "zod";
import { ASSET_TYPES } from "../types/asset.types";

export const createAssetFromUrlSchema = z.object({
  assetName: z.string().min(1),
  assetType: z.enum(ASSET_TYPES),
  ownerName: z.string().optional().default("Unknown owner"),
  partnerName: z.string().min(1),
  url: z.string().url(),
  rawText: z.string().optional(),
  metadata: z.record(z.any()).optional().default({})
});
