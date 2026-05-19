import type { Request, Response } from "express";
import { createAssetFromUpload, createAssetFromUrl, getAssetById, listAssets } from "../services/asset.service";
import { AppError } from "../middleware/errorHandler";

export const createAssetFromUrlHandler = async (req: Request, res: Response) => {
  const result = await createAssetFromUrl(req.body);
  res.status(201).json(result);
};

export const createAssetFromUploadHandler = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError("VALIDATION_ERROR", "File upload is required", 400);
  }

  const result = await createAssetFromUpload({
    filePath: req.file.path,
    mimeType: req.file.mimetype,
    originalName: req.file.originalname,
    assetName: String(req.body.assetName ?? req.file.originalname),
    assetType: String(req.body.assetType ?? "document"),
    ownerName: String(req.body.ownerName ?? "Unknown owner"),
    partnerName: String(req.body.partnerName ?? "Unknown partner"),
    url: req.body.url ? String(req.body.url) : undefined
  });
  res.status(201).json(result);
};

export const listAssetsHandler = async (_req: Request, res: Response) => {
  res.json(await listAssets());
};

export const getAssetHandler = async (req: Request, res: Response) => {
  res.json(await getAssetById(req.params.assetId));
};
