import fs from "node:fs/promises";
import path from "node:path";
import { ReportModel } from "../../models/Report.model";
import { FindingModel } from "../../models/Finding.model";
import { SourceUpdateEventModel } from "../../models/SourceUpdateEvent.model";
import { ImpactTaskModel } from "../../models/ImpactTask.model";
import { AppError } from "../../middleware/errorHandler";
import { countBySeverity } from "../../utils/severity";
import { toCsv } from "../../utils/csv";

const reportsDir = path.resolve(process.cwd(), "reports");

export const generateReport = async (sourceUpdateEventId: string, format: "json" | "csv" | "pdf" | "docx") => {
  if (format === "pdf" || format === "docx") {
    throw new AppError("NOT_IMPLEMENTED", "PDF and DOCX report generation are planned for a later version", 501);
  }

  const event = await SourceUpdateEventModel.findById(sourceUpdateEventId);
  if (!event) {
    throw new AppError("NOT_FOUND", "Source update event not found", 404);
  }

  const findings = await FindingModel.find({ updateEventId: event._id }).populate("downstreamAssetId");
  const tasks = await ImpactTaskModel.find({ findingId: { $in: findings.map((finding) => finding._id) } });

  const basePayload = {
    summary: {
      totalFindings: findings.length,
      counts: countBySeverity(findings)
    },
    sourceUpdate: event,
    impactedAssets: [...new Set(findings.map((finding) => finding.downstreamAssetId.toString()))].length,
    findings: findings.map((finding) => ({
      severity: finding.severity,
      issueType: finding.issueType,
      issue: finding.issue,
      downstreamAsset:
        typeof finding.downstreamAssetId === "object" && "assetName" in finding.downstreamAssetId
          ? finding.downstreamAssetId.assetName
          : finding.downstreamAssetId.toString(),
      thirdPartyEvidence: finding.thirdPartyEvidence,
      approvedSourceEvidence: finding.approvedSourceEvidence,
      suggestedFix: finding.suggestedFix,
      status: finding.status
    })),
    suggestedFixes: findings.map((finding) => finding.suggestedFix),
    tasks,
    disclaimer: "Mock AI findings are intended for demo and integration validation only."
  };

  await fs.mkdir(reportsDir, { recursive: true });
  const extension = format === "json" ? "json" : "csv";
  const filePath = path.join(reportsDir, `report-${event._id.toString()}.${extension}`);
  const serialized =
    format === "json"
      ? JSON.stringify(basePayload, null, 2)
      : toCsv(basePayload.findings as unknown as Record<string, unknown>[]);

  await fs.writeFile(filePath, serialized, "utf8");

  const report = await ReportModel.create({
    reportType: format,
    sourceUpdateEventId: event._id,
    findingIds: findings.map((finding) => finding._id),
    filePath,
    downloadUrl: "",
    status: "generated"
  });

  report.downloadUrl = `/api/reports/${report._id.toString()}/download`;
  await report.save();

  return report;
};

export const getReportById = async (reportId: string) => {
  const report = await ReportModel.findById(reportId);
  if (!report) {
    throw new AppError("NOT_FOUND", "Report not found", 404);
  }

  return report;
};
