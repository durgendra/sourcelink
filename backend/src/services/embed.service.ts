import { AppError } from "../middleware/errorHandler";
import { SourceObjectModel } from "../models/SourceObject.model";
import { SourceVersionModel } from "../models/SourceVersion.model";

export const generateEmbed = async (sourceObjectId: string, updateMode: string) => {
  const source = await SourceObjectModel.findById(sourceObjectId);
  if (!source) {
    throw new AppError("NOT_FOUND", "Source object not found", 404);
  }

  const currentVersion = await SourceVersionModel.findById(source.currentVersionId);
  if (!currentVersion) {
    throw new AppError("NOT_FOUND", "Current source version not found", 404);
  }

  return {
    inlineHtml: `<span data-sl-ref="${source.sourceId}" data-sl-version="${currentVersion.version}" data-sl-mode="${updateMode}">${currentVersion.sourceText}</span>`,
    jsonLd: `<script type="application/ld+json">{"@context":"https://schema.sourcelink.ai/v1","@type":"SourceLinkReference","sourceId":"${source.sourceId}","version":"${currentVersion.version}","canonicalUrl":"${source.canonicalUrl}"}</script>`,
    badgeWidget: `<script src="https://cdn.sourcelink.ai/badge.js" data-sourcelink-ref="${source.sourceId}"></script>`
  };
};

export const getEmbedMetadata = async (sourceObjectId: string) => {
  const source = await SourceObjectModel.findById(sourceObjectId).populate("currentVersionId");
  if (!source) {
    throw new AppError("NOT_FOUND", "Source object not found", 404);
  }

  return {
    sourceObjectId: source._id,
    sourceId: source.sourceId,
    currentVersion: source.currentVersionId
  };
};
