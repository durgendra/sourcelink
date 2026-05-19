import { AppError } from "../middleware/errorHandler";
import { SourceObjectModel } from "../models/SourceObject.model";
import { SourceUpdateEventModel } from "../models/SourceUpdateEvent.model";
import { SourceVersionModel } from "../models/SourceVersion.model";
import { detectChange } from "./lineage/changeDetector.service";
import { createSourceVersion, listSourceVersions } from "./sourceVersion.service";
import { createSourceId } from "../utils/ids";

const normalizeId = (value: unknown) =>
  typeof value === "string" ? value : value && typeof value === "object" && "_id" in (value as Record<string, unknown>)
    ? String((value as { _id: unknown })._id)
    : String(value ?? "");

export const createSource = async (payload: {
  name: string;
  objectType: string;
  ownerName: string;
  ownerDomain: string;
  canonicalUrl: string;
  sourceText: string;
  version: string;
  scope: Record<string, unknown>;
}) => {
  const source = await SourceObjectModel.create({
    sourceId: createSourceId(payload.ownerDomain, payload.name),
    name: payload.name,
    objectType: payload.objectType,
    ownerName: payload.ownerName,
    ownerDomain: payload.ownerDomain,
    canonicalUrl: payload.canonicalUrl,
    scope: payload.scope
  });

  const initialVersion = await createSourceVersion({
    sourceObjectId: normalizeId(source._id),
    version: payload.version,
    sourceText: payload.sourceText,
    sourceUrl: payload.canonicalUrl,
    manifest: { scope: payload.scope }
  });

  source.currentVersionId = initialVersion._id;
  await source.save();

  return {
    sourceObjectId: source._id.toString(),
    sourceId: source.sourceId,
    currentVersion: initialVersion.version
  };
};

export const listSources = async () =>
  SourceObjectModel.find().sort({ updatedAt: -1 }).populate("currentVersionId");

export const getSourceById = async (sourceObjectId: string) => {
  const source = await SourceObjectModel.findById(sourceObjectId).populate("currentVersionId");
  if (!source) {
    throw new AppError("NOT_FOUND", "Source object not found", 404);
  }

  return source;
};

export const appendSourceVersion = async (
  sourceObjectId: string,
  payload: { version: string; sourceText: string; sourceUrl?: string; manifest?: Record<string, unknown> }
) => {
  const source = await getSourceById(sourceObjectId);
  return createSourceVersion({
    sourceObjectId: normalizeId(source._id),
    version: payload.version,
    sourceText: payload.sourceText,
    sourceUrl: payload.sourceUrl ?? source.canonicalUrl,
    manifest: payload.manifest,
    supersedesVersionId: source.currentVersionId ? normalizeId(source.currentVersionId) : null
  });
};

export const updateSourceAndCreateEvent = async (
  sourceObjectId: string,
  payload: { newVersion: string; sourceText: string; changeType: string; severity: string; summary: string }
) => {
  const source = await getSourceById(sourceObjectId);
  const previousVersionId = source.currentVersionId ? normalizeId(source.currentVersionId) : null;
  const previousVersion = previousVersionId ? await SourceVersionModel.findById(previousVersionId) : null;
  const change = detectChange(previousVersion, payload.sourceText);

  const nextVersion = await createSourceVersion({
    sourceObjectId: normalizeId(source._id),
    version: payload.newVersion,
    sourceText: payload.sourceText,
    sourceUrl: source.canonicalUrl,
    supersedesVersionId: previousVersion ? normalizeId(previousVersion._id) : null,
    manifest: { deltaSummary: change.deltaSummary }
  });

  const event = await SourceUpdateEventModel.create({
    sourceObjectId: source._id,
    oldVersionId: previousVersion?._id ?? null,
    newVersionId: nextVersion._id,
    eventType: previousVersion ? "source_updated" : "source_created",
    changeType: payload.changeType,
    severity: payload.severity,
    summary: payload.summary
  });

  return {
    eventId: event._id.toString(),
    sourceObjectId: source._id.toString(),
    oldVersion: previousVersion?.version ?? null,
    newVersion: nextVersion.version
  };
};

export { listSourceVersions };
