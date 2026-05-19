import fs from "node:fs/promises";
import { AppError } from "../middleware/errorHandler";
import { DownstreamAssetModel } from "../models/DownstreamAsset.model";
import { parseDocument } from "./parser/documentParser.service";
import { cleanText } from "./parser/textCleaner.service";
import { parseWebpage } from "./parser/webpageParser.service";

export const createAssetFromUrl = async (payload: {
  assetName: string;
  assetType: string;
  ownerName: string;
  partnerName: string;
  url: string;
  rawText?: string;
  metadata?: Record<string, unknown>;
}) => {
  const parsed = payload.rawText ? { rawText: payload.rawText, metadata: {} } : await parseWebpage(payload.url);
  const rawText = payload.rawText ?? parsed.rawText;
  const cleanedText = cleanText(rawText);

  return DownstreamAssetModel.create({
    assetName: payload.assetName,
    assetType: payload.assetType,
    ownerName: payload.ownerName,
    partnerName: payload.partnerName,
    url: payload.url,
    rawText,
    cleanedText,
    metadata: { ...parsed.metadata, ...payload.metadata }
  });
};

export const createAssetFromUpload = async (params: {
  filePath: string;
  mimeType: string;
  originalName: string;
  assetName: string;
  assetType: string;
  ownerName: string;
  partnerName: string;
  url?: string;
}) => {
  try {
    const parsed = await parseDocument(params.filePath, params.mimeType);
    return await DownstreamAssetModel.create({
      assetName: params.assetName,
      assetType: params.assetType,
      ownerName: params.ownerName,
      partnerName: params.partnerName,
      url: params.url ?? null,
      rawText: parsed.rawText,
      cleanedText: cleanText(parsed.rawText),
      metadata: { ...parsed.metadata, originalName: params.originalName, mimeType: params.mimeType }
    });
  } finally {
    await fs.unlink(params.filePath).catch(() => undefined);
  }
};

export const listAssets = async () => DownstreamAssetModel.find().sort({ updatedAt: -1 });

export const getAssetById = async (assetId: string) => {
  const asset = await DownstreamAssetModel.findById(assetId);
  if (!asset) {
    throw new AppError("NOT_FOUND", "Downstream asset not found", 404);
  }

  return asset;
};
