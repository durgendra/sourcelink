import { Router } from "express";
import {
  createAssetFromUploadHandler,
  createAssetFromUrlHandler,
  getAssetHandler,
  listAssetsHandler
} from "../controllers/asset.controller";
import { upload } from "../middleware/upload";
import { validateRequest } from "../middleware/validateRequest";
import { createAssetFromUrlSchema } from "../schemas/asset.schema";

export const assetRouter = Router();

assetRouter.post("/url", validateRequest(createAssetFromUrlSchema), createAssetFromUrlHandler);
assetRouter.post("/upload", upload.single("file"), createAssetFromUploadHandler);
assetRouter.get("/", listAssetsHandler);
assetRouter.get("/:assetId", getAssetHandler);
