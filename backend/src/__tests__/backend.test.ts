import { beforeEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs/promises";

const {
  sourceObjectCreateMock,
  sourceObjectFindByIdMock,
  sourceObjectFindMock,
  sourceObjectFindByIdAndUpdateMock,
  sourceVersionFindByIdMock,
  sourceVersionFindOneMock,
  sourceVersionCreateMock,
  sourceVersionUpdateManyMock,
  usageCreateMock,
  usageDeleteManyMock,
  usageFindMock,
  findingCreateMock,
  findingFindByIdAndUpdateMock,
  findingFindMock,
  findingDeleteManyMock,
  taskCreateMock,
  taskDeleteManyMock,
  taskFindMock,
  taskUpdateManyMock,
  reportCreateMock,
  sourceEventCreateMock,
  sourceEventFindByIdMock,
  assetCreateMock,
  assetFindByIdMock,
  assetFindMock
} = vi.hoisted(() => ({
  sourceObjectCreateMock: vi.fn(),
  sourceObjectFindByIdMock: vi.fn(),
  sourceObjectFindMock: vi.fn(),
  sourceObjectFindByIdAndUpdateMock: vi.fn(),
  sourceVersionFindByIdMock: vi.fn(),
  sourceVersionFindOneMock: vi.fn(),
  sourceVersionCreateMock: vi.fn(),
  sourceVersionUpdateManyMock: vi.fn(),
  usageCreateMock: vi.fn(),
  usageDeleteManyMock: vi.fn(),
  usageFindMock: vi.fn(),
  findingCreateMock: vi.fn(),
  findingFindByIdAndUpdateMock: vi.fn(),
  findingFindMock: vi.fn(),
  findingDeleteManyMock: vi.fn(),
  taskCreateMock: vi.fn(),
  taskDeleteManyMock: vi.fn(),
  taskFindMock: vi.fn(),
  taskUpdateManyMock: vi.fn(),
  reportCreateMock: vi.fn(),
  sourceEventCreateMock: vi.fn(),
  sourceEventFindByIdMock: vi.fn(),
  assetCreateMock: vi.fn(),
  assetFindByIdMock: vi.fn(),
  assetFindMock: vi.fn()
}));

vi.mock("../models/SourceObject.model", () => ({
  SourceObjectModel: {
    create: sourceObjectCreateMock,
    findById: sourceObjectFindByIdMock,
    find: sourceObjectFindMock,
    findByIdAndUpdate: sourceObjectFindByIdAndUpdateMock
  }
}));

vi.mock("../models/SourceVersion.model", () => ({
  SourceVersionModel: {
    findById: sourceVersionFindByIdMock,
    findOne: sourceVersionFindOneMock,
    create: sourceVersionCreateMock,
    updateMany: sourceVersionUpdateManyMock
  }
}));

vi.mock("../models/SourceLinkUsage.model", () => ({
  SourceLinkUsageModel: {
    create: usageCreateMock,
    deleteMany: usageDeleteManyMock,
    find: usageFindMock
  }
}));

vi.mock("../models/Finding.model", () => ({
  FindingModel: {
    create: findingCreateMock,
    findByIdAndUpdate: findingFindByIdAndUpdateMock,
    find: findingFindMock,
    deleteMany: findingDeleteManyMock
  }
}));

vi.mock("../models/ImpactTask.model", () => ({
  ImpactTaskModel: {
    create: taskCreateMock,
    deleteMany: taskDeleteManyMock,
    find: taskFindMock,
    updateMany: taskUpdateManyMock
  }
}));

vi.mock("../models/Report.model", () => ({
  ReportModel: {
    create: reportCreateMock
  }
}));

vi.mock("../models/SourceUpdateEvent.model", () => ({
  SourceUpdateEventModel: {
    create: sourceEventCreateMock,
    findById: sourceEventFindByIdMock
  }
}));

vi.mock("../models/DownstreamAsset.model", () => ({
  DownstreamAssetModel: {
    create: assetCreateMock,
    findById: assetFindByIdMock,
    find: assetFindMock
  }
}));

import { createSource, updateSourceAndCreateEvent } from "../services/source.service";
import { generateEmbed } from "../services/embed.service";
import { createAssetFromUrl } from "../services/asset.service";
import { detectUsagesForAsset } from "../services/usage.service";
import { runImpactAnalysis } from "../services/lineage/impactEngine.service";
import { generateMockFindings } from "../services/ai/mockFindingGenerator.service";
import { updateFindingStatus } from "../services/finding.service";
import { generateReport } from "../services/report/reportGenerator.service";

describe("SourceLink backend services", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.spyOn(fs, "mkdir").mockResolvedValue(undefined as never);
    vi.spyOn(fs, "writeFile").mockResolvedValue(undefined);
  });

  it("creates a source object and first version", async () => {
    sourceObjectCreateMock.mockResolvedValue({
      _id: "source-1",
      sourceId: "sl:demo:partner-relationship-language",
      save: vi.fn()
    });
    sourceVersionFindOneMock.mockResolvedValue(null);
    sourceVersionUpdateManyMock.mockResolvedValue(undefined);
    sourceVersionCreateMock.mockResolvedValue({
      _id: "version-1",
      version: "1.0"
    });
    sourceObjectFindByIdAndUpdateMock.mockResolvedValue(undefined);

    const result = await createSource({
      name: "Partner Relationship Language",
      objectType: "brand_rule",
      ownerName: "Demo",
      ownerDomain: "demo.sourcelink.ai",
      canonicalUrl: "https://sourcelink.ai/ref",
      sourceText: "Authorized reseller",
      version: "1.0",
      scope: {}
    });

    expect(result.currentVersion).toBe("1.0");
    expect(result.sourceObjectId).toBe("source-1");
  });

  it("generates embed snippets", async () => {
    sourceObjectFindByIdMock.mockResolvedValue({
      _id: "source-1",
      sourceId: "sl:demo:apple-style:partner-status",
      canonicalUrl: "https://sourcelink.ai/r/sl:demo:apple-style:partner-status",
      currentVersionId: "version-1"
    });
    sourceVersionFindByIdMock.mockResolvedValue({
      _id: "version-1",
      version: "1.0",
      sourceText: "Authorized reseller"
    });

    const result = await generateEmbed("source-1", "review-required");

    expect(result.inlineHtml).toContain("data-sl-ref=\"sl:demo:apple-style:partner-status\"");
    expect(result.badgeWidget).toContain("badge.js");
  });

  it("creates a downstream asset from direct text", async () => {
    assetCreateMock.mockImplementation(async (payload) => payload);

    const result = await createAssetFromUrl({
      assetName: "Synthetic Affiliate Page",
      assetType: "webpage",
      ownerName: "Partner",
      partnerName: "Partner",
      url: "https://demo.partner.test/apple-style",
      rawText: "Official Apple Partner. Lifetime support included."
    });

    expect(result.cleanedText).toContain("Official Apple Partner");
  });

  it("detects usage patterns in a downstream asset", async () => {
    assetFindByIdMock.mockResolvedValue({
      _id: "asset-1",
      cleanedText: "Official Apple Partner. Buy iPhone Pro Maxx today. Lifetime support included.",
      rawText: "",
      metadata: { oldLogoPresent: true }
    });
    sourceObjectFindMock.mockResolvedValue([
      {
        _id: "source-1",
        name: "Partner Relationship Language",
        sourceId: "sl:demo:apple-style:partner-status",
        currentVersionId: "version-1"
      }
    ]);
    sourceVersionFindByIdMock.mockResolvedValue({
      _id: "version-1",
      version: "1.0",
      sourceText: "Authorized reseller"
    });
    usageDeleteManyMock.mockResolvedValue(undefined);
    usageCreateMock.mockImplementation(async (payload) => payload);

    const result = await detectUsagesForAsset("asset-1");

    expect(result.length).toBeGreaterThanOrEqual(3);
    expect(result.some((item) => item.detectedText === "official apple partner")).toBe(true);
  });

  it("creates a source update event", async () => {
    sourceObjectFindByIdMock.mockReturnValue({
      populate: vi.fn().mockResolvedValue({
        _id: "source-1",
        canonicalUrl: "https://sourcelink.ai/ref",
        currentVersionId: "version-1"
      })
    });
    sourceVersionFindByIdMock.mockResolvedValue({
      _id: "version-1",
      version: "1.0",
      sourceText: "Authorized reseller"
    });
    sourceVersionFindOneMock.mockResolvedValue(null);
    sourceVersionUpdateManyMock.mockResolvedValue(undefined);
    sourceVersionCreateMock.mockResolvedValue({
      _id: "version-2",
      version: "2.0"
    });
    sourceObjectFindByIdAndUpdateMock.mockResolvedValue(undefined);
    sourceEventCreateMock.mockResolvedValue({
      _id: "event-1"
    });

    const result = await updateSourceAndCreateEvent("source-1", {
      newVersion: "2.0",
      sourceText: "Do not use Official Partner unless explicitly authorized.",
      changeType: "brand_rule_changed",
      severity: "high",
      summary: "Partner affiliation language restricted."
    });

    expect(result.eventId).toBe("event-1");
    expect(result.oldVersion).toBe("1.0");
  });

  it("runs impact analysis and creates findings/tasks", async () => {
    sourceEventFindByIdMock.mockResolvedValue({
      _id: "event-1",
      sourceObjectId: "source-1",
      newVersionId: "version-2"
    });
    sourceObjectFindByIdMock.mockResolvedValue({
      _id: "source-1",
      name: "Partner Relationship Language"
    });
    sourceVersionFindByIdMock.mockResolvedValue({
      _id: "version-2",
      version: "2.0",
      sourceText: "Use approved reseller-status language only when verified."
    });
    usageFindMock.mockResolvedValue([
      {
        _id: "usage-1",
        usedVersion: "1.0",
        downstreamAssetId: "asset-1",
        status: "current",
        save: vi.fn()
      }
    ]);
    assetFindMock.mockResolvedValue([
      {
        _id: "asset-1",
        cleanedText: "Official Apple Partner. Buy iPhone Pro Maxx today. Lifetime support included.",
        rawText: "",
        metadata: { oldLogoPresent: true }
      }
    ]);
    findingDeleteManyMock.mockResolvedValue(undefined);
    findingCreateMock.mockImplementation(async (payload) => ({ _id: `finding-${Math.random()}`, ...payload }));
    taskDeleteManyMock.mockResolvedValue(undefined);
    taskCreateMock.mockImplementation(async (payload) => payload);

    const result = await runImpactAnalysis("event-1");

    expect(result.impactedAssets).toBe(1);
    expect(result.findings.high).toBeGreaterThan(0);
    expect(result.tasksCreated).toBeGreaterThan(0);
  });

  it("generates expected demo findings", () => {
    const findings = generateMockFindings({
      asset: {
        _id: "asset-1",
        cleanedText: "Official Apple Partner. Buy iPhone Pro Maxx today. Lifetime support included.",
        rawText: "",
        metadata: { oldLogoPresent: true }
      } as never,
      source: {
        _id: "source-1",
        name: "Partner Relationship Language"
      } as never,
      currentVersion: {
        _id: "version-2",
        sourceText: "Use approved reseller-status language only when verified."
      } as never,
      usages: []
    });

    expect(findings.map((finding) => finding.issueType)).toEqual(
      expect.arrayContaining([
        "unsupported_affiliation_language",
        "incorrect_product_name",
        "missing_disclaimer",
        "unsupported_claim",
        "outdated_logo"
      ])
    );
  });

  it("updates finding status", async () => {
    findingFindByIdAndUpdateMock.mockResolvedValue({
      _id: "finding-1",
      status: "accepted"
    });

    const result = await updateFindingStatus("finding-1", "accepted");

    expect(result.status).toBe("accepted");
  });

  it("generates JSON and CSV reports", async () => {
    sourceEventFindByIdMock.mockResolvedValue({ _id: "event-1", summary: "Updated" });
    findingFindMock.mockReturnValue({
      populate: vi.fn().mockResolvedValue([
        {
          _id: "finding-1",
          severity: "high",
          issueType: "unsupported_affiliation_language",
          issue: "Unsupported language",
          downstreamAssetId: { toString: () => "asset-1", assetName: "Synthetic Affiliate Page" },
          thirdPartyEvidence: "Official Apple Partner",
          approvedSourceEvidence: "Authorized reseller",
          suggestedFix: "Replace with approved reseller language.",
          status: "open"
        }
      ])
    });
    taskFindMock.mockResolvedValue([]);
    reportCreateMock.mockImplementation(async (payload) => ({
      _id: "report-1",
      ...payload,
      save: vi.fn()
    }));

    const jsonReport = await generateReport("event-1", "json");
    const csvReport = await generateReport("event-1", "csv");

    expect(jsonReport.reportType).toBe("json");
    expect(csvReport.reportType).toBe("csv");
    expect(fs.writeFile).toHaveBeenCalled();
  });
});
