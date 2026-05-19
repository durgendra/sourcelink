import { Router } from "express";
import { detectUsagesHandler, getAssetUsagesHandler, getSourceUsagesHandler } from "../controllers/usage.controller";
import { validateRequest } from "../middleware/validateRequest";
import { detectUsageSchema } from "../schemas/usage.schema";

export const usageRouter = Router();

usageRouter.post("/assets/:assetId/detect-usages", validateRequest(detectUsageSchema), detectUsagesHandler);
usageRouter.get("/assets/:assetId/usages", getAssetUsagesHandler);
usageRouter.get("/sources/:sourceObjectId/usages", getSourceUsagesHandler);
