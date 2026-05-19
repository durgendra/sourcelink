import { AppError } from "../middleware/errorHandler";
import { FindingModel } from "../models/Finding.model";
import { ImpactTaskModel } from "../models/ImpactTask.model";

export const listFindings = async () =>
  FindingModel.find().sort({ createdAt: -1 }).populate("sourceObjectId downstreamAssetId updateEventId");

export const getFindingById = async (findingId: string) => {
  const finding = await FindingModel.findById(findingId).populate("sourceObjectId downstreamAssetId updateEventId");
  if (!finding) {
    throw new AppError("NOT_FOUND", "Finding not found", 404);
  }
  return finding;
};

export const updateFindingStatus = async (findingId: string, status: string) => {
  const finding = await FindingModel.findByIdAndUpdate(findingId, { status }, { new: true });
  if (!finding) {
    throw new AppError("NOT_FOUND", "Finding not found", 404);
  }

  return finding;
};

export const patchFinding = async (
  findingId: string,
  payload: { status?: string; suggestedFix?: string; reason?: string; confidence?: number; taskStatus?: string }
) => {
  const finding = await FindingModel.findByIdAndUpdate(
    findingId,
    {
      ...(payload.status ? { status: payload.status } : {}),
      ...(payload.suggestedFix ? { suggestedFix: payload.suggestedFix } : {}),
      ...(payload.reason ? { reason: payload.reason } : {}),
      ...(payload.confidence !== undefined ? { confidence: payload.confidence } : {})
    },
    { new: true }
  );

  if (!finding) {
    throw new AppError("NOT_FOUND", "Finding not found", 404);
  }

  if (payload.taskStatus) {
    await ImpactTaskModel.updateMany({ findingId: finding._id }, { status: payload.taskStatus });
  }

  return finding;
};
