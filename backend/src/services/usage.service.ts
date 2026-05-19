import { SourceObjectModel } from "../models/SourceObject.model";
import { SourceVersionModel } from "../models/SourceVersion.model";
import { SourceLinkUsageModel } from "../models/SourceLinkUsage.model";
import { AppError } from "../middleware/errorHandler";
import { getAssetById } from "./asset.service";
import { matchSourceInText } from "./lineage/lineageMatcher.service";
import { extractMockClaims } from "./ai/mockClaimExtractor.service";

export const detectUsagesForAsset = async (assetId: string, sourceObjectIds?: string[]) => {
  const asset = await getAssetById(assetId);
  const sourceQuery = sourceObjectIds?.length ? { _id: { $in: sourceObjectIds } } : {};
  const sources = await SourceObjectModel.find(sourceQuery);

  if (!sources.length) {
    throw new AppError("NOT_FOUND", "No source objects available for usage detection", 404);
  }

  await SourceLinkUsageModel.deleteMany({ downstreamAssetId: asset._id });

  const claims = extractMockClaims(asset.cleanedText || asset.rawText);
  const usages = [];

  for (const source of sources) {
    const currentVersion = await SourceVersionModel.findById(source.currentVersionId);
    if (!currentVersion) {
      continue;
    }

    const match = matchSourceInText(source, asset.cleanedText || asset.rawText);
    if (!match.isMatch) {
      continue;
    }

    const candidates = [
      claims.partnerStatus && {
        usageType: "paraphrased",
        detectedText: claims.partnerStatus,
        confidence: 0.96,
        status: claims.partnerStatus.includes("official apple partner") ? "risky" : "current"
      },
      claims.incorrectProductName && {
        usageType: "inferred",
        detectedText: claims.incorrectProductName,
        confidence: 0.92,
        status: "risky"
      },
      claims.supportClaim && {
        usageType: "copied",
        detectedText: claims.supportClaim,
        confidence: 0.94,
        status: "risky"
      },
      asset.metadata?.oldLogoPresent && {
        usageType: "badge",
        detectedText: "old logo",
        confidence: 0.82,
        status: "risky"
      }
    ].filter(Boolean) as Array<{
      usageType: "embedded" | "copied" | "paraphrased" | "inferred" | "badge";
      detectedText: string;
      confidence: number;
      status: "current" | "stale" | "risky" | "unknown";
    }>;

    if (!candidates.length) {
      candidates.push({
        usageType: "embedded",
        detectedText: currentVersion.sourceText,
        confidence: 0.7,
        status: "current"
      });
    }

    for (const candidate of candidates) {
      usages.push(
        await SourceLinkUsageModel.create({
          sourceObjectId: source._id,
          sourceVersionId: currentVersion._id,
          downstreamAssetId: asset._id,
          usageType: candidate.usageType,
          embeddedRef: source.sourceId,
          usedVersion: currentVersion.version,
          detectedText: candidate.detectedText,
          confidence: candidate.confidence,
          status: candidate.status
        })
      );
    }
  }

  return usages;
};

export const getUsagesByAsset = async (assetId: string) =>
  SourceLinkUsageModel.find({ downstreamAssetId: assetId }).populate("sourceObjectId sourceVersionId");

export const getUsagesBySource = async (sourceObjectId: string) =>
  SourceLinkUsageModel.find({ sourceObjectId }).populate("downstreamAssetId sourceVersionId");
