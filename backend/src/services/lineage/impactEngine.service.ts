import { FindingModel } from "../../models/Finding.model";
import { ImpactTaskModel } from "../../models/ImpactTask.model";
import { SourceObjectModel } from "../../models/SourceObject.model";
import { SourceUpdateEventModel } from "../../models/SourceUpdateEvent.model";
import { SourceVersionModel } from "../../models/SourceVersion.model";
import { SourceLinkUsageModel } from "../../models/SourceLinkUsage.model";
import { AppError } from "../../middleware/errorHandler";
import { countBySeverity } from "../../utils/severity";
import { DownstreamAssetModel } from "../../models/DownstreamAsset.model";
import { generateMockFindings } from "../ai/mockFindingGenerator.service";

export const runImpactAnalysis = async (eventId: string) => {
  const event = await SourceUpdateEventModel.findById(eventId);
  if (!event) {
    throw new AppError("NOT_FOUND", "Source update event not found", 404);
  }

  const source = await SourceObjectModel.findById(event.sourceObjectId);
  const currentVersion = await SourceVersionModel.findById(event.newVersionId);
  if (!source || !currentVersion) {
    throw new AppError("NOT_FOUND", "Source update references missing records", 404);
  }

  const usages = await SourceLinkUsageModel.find({ sourceObjectId: source._id });
  await FindingModel.deleteMany({ updateEventId: event._id });

  const findings = [];
  const impactedAssetIds = new Set<string>();

  for (const usage of usages) {
    if (usage.usedVersion !== currentVersion.version) {
      usage.status = "stale";
      await usage.save();
    }

    impactedAssetIds.add(usage.downstreamAssetId.toString());
  }

  const impactedAssets = await DownstreamAssetModel.find({ _id: { $in: [...impactedAssetIds] } });

  for (const asset of impactedAssets) {
    const assetUsages = usages.filter((usage) => usage.downstreamAssetId.toString() === asset._id.toString());
    const generated = generateMockFindings({ asset, source, currentVersion, usages: assetUsages });
    for (const finding of generated) {
      findings.push(
        await FindingModel.create({
          updateEventId: event._id,
          sourceObjectId: source._id,
          downstreamAssetId: asset._id,
          usageId: finding.usageId ?? null,
          severity: finding.severity,
          issueType: finding.issueType,
          issue: finding.issue,
          thirdPartyEvidence: finding.thirdPartyEvidence,
          approvedSourceEvidence: finding.approvedSourceEvidence,
          reason: finding.reason,
          suggestedFix: finding.suggestedFix,
          confidence: finding.confidence,
          status: "open"
        })
      );
    }
  }

  await ImpactTaskModel.deleteMany({
    findingId: { $in: findings.map((finding) => finding._id) }
  });

  const tasks = [];
  for (const finding of findings.filter((item) => item.severity !== "low")) {
    tasks.push(
      await ImpactTaskModel.create({
        findingId: finding._id,
        assignee: "Partner Ops",
        status: "open",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        suggestedAction: finding.suggestedFix
      })
    );
  }

  return {
    eventId: event._id.toString(),
    impactedAssets: impactedAssetIds.size,
    findings: countBySeverity(findings),
    tasksCreated: tasks.length
  };
};

export const getImpactByEvent = async (eventId: string) => {
  const findings = await FindingModel.find({ updateEventId: eventId });
  const tasks = await ImpactTaskModel.find({
    findingId: { $in: findings.map((finding) => finding._id) }
  });

  return {
    eventId,
    findings,
    tasks,
    summary: {
      impactedAssets: new Set(findings.map((finding) => finding.downstreamAssetId.toString())).size,
      findings: countBySeverity(findings),
      tasksCreated: tasks.length
    }
  };
};

export const getImpactGraph = async () => {
  const latestEvent = await SourceUpdateEventModel.findOne().sort({ createdAt: -1 });
  if (!latestEvent) {
    return { source: null, nodes: [] };
  }

  const currentVersion = await SourceVersionModel.findById(latestEvent.newVersionId);
  const findings = await FindingModel.find({ updateEventId: latestEvent._id }).populate("downstreamAssetId");
  const nodeMap = new Map<string, { name: string; risk: string }>();

  for (const finding of findings) {
    const asset = finding.downstreamAssetId as unknown as { _id: string; assetName: string };
    if (!asset?._id) {
      continue;
    }
    const risk = finding.severity === "high" || finding.severity === "critical" ? "high" : "medium";
    nodeMap.set(asset._id.toString(), { name: asset.assetName, risk });
  }

  return {
    source: currentVersion ? `Source Update ${currentVersion.version}` : latestEvent.summary,
    nodes: [...nodeMap.values()]
  };
};
