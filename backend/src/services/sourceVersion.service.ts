import { AppError } from "../middleware/errorHandler";
import { SourceObjectModel } from "../models/SourceObject.model";
import { SourceVersionModel } from "../models/SourceVersion.model";
import { createContentHash } from "../utils/hashes";

export const createSourceVersion = async (params: {
  sourceObjectId: string;
  version: string;
  sourceText: string;
  sourceUrl?: string;
  manifest?: Record<string, unknown>;
  supersedesVersionId?: string | null;
  setCurrent?: boolean;
}) => {
  const sourceObjectId = params.sourceObjectId;
  const versionExists = await SourceVersionModel.findOne({ sourceObjectId, version: params.version });
  if (versionExists) {
    throw new AppError("CONFLICT", "Source version already exists", 409);
  }

  if (params.setCurrent !== false) {
    await SourceVersionModel.updateMany(
      { sourceObjectId, status: "current" },
      { status: "previous", validUntil: new Date() }
    );
  }

  const version = await SourceVersionModel.create({
    sourceObjectId,
    version: params.version,
    sourceText: params.sourceText,
    sourceUrl: params.sourceUrl ?? null,
    contentHash: createContentHash(params.sourceText),
    status: params.setCurrent === false ? "previous" : "current",
    validFrom: new Date(),
    supersedesVersionId: params.supersedesVersionId ?? null,
    manifest: params.manifest ?? {}
  });

  if (params.setCurrent !== false) {
    await SourceObjectModel.findByIdAndUpdate(sourceObjectId, { currentVersionId: version._id });
  }

  return version;
};

export const listSourceVersions = async (sourceObjectId: string) =>
  SourceVersionModel.find({ sourceObjectId }).sort({ createdAt: -1 });
