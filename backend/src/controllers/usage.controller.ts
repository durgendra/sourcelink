import type { Request, Response } from "express";
import { detectUsagesForAsset, getUsagesByAsset, getUsagesBySource } from "../services/usage.service";

export const detectUsagesHandler = async (req: Request, res: Response) => {
  const result = await detectUsagesForAsset(req.params.assetId, req.body.sourceObjectIds);
  res.status(201).json(result);
};

export const getAssetUsagesHandler = async (req: Request, res: Response) => {
  res.json(await getUsagesByAsset(req.params.assetId));
};

export const getSourceUsagesHandler = async (req: Request, res: Response) => {
  res.json(await getUsagesBySource(req.params.sourceObjectId));
};
