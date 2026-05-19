import { DemoScenarioModel } from "../../models/DemoScenario.model";
import { FindingModel } from "../../models/Finding.model";
import { SourceUpdateEventModel } from "../../models/SourceUpdateEvent.model";
import { createAssetFromUrl } from "../asset.service";
import { detectUsagesForAsset } from "../usage.service";
import { runImpactAnalysis } from "../lineage/impactEngine.service";
import { createSource, updateSourceAndCreateEvent } from "../source.service";

export const seedAppleStyleDemo = async () => {
  const existing = await DemoScenarioModel.findOne({ name: "apple-style" });
  if (existing) {
    return existing;
  }

  const source = await createSource({
    name: "Partner Relationship Language",
    objectType: "brand_rule",
    ownerName: "Synthetic Apple-style Demo",
    ownerDomain: "demo.sourcelink.ai",
    canonicalUrl: "https://sourcelink.ai/r/sl:demo:apple-style:partner-status",
    sourceText: "Authorized reseller",
    version: "1.0",
    scope: {
      brand: "Apple-style demo",
      usage: "partner relationship language"
    }
  });

  const assets = await Promise.all([
    createAssetFromUrl({
      assetName: "Synthetic Affiliate Page",
      assetType: "webpage",
      ownerName: "Synthetic Partner",
      partnerName: "Synthetic Partner",
      url: "https://demo.partner.test/apple-style",
      rawText: "Official Apple Partner. Buy iPhone Pro Maxx today. Lifetime support included.",
      metadata: { oldLogoPresent: true }
    }),
    createAssetFromUrl({
      assetName: "Partner Landing Page",
      assetType: "webpage",
      ownerName: "Synthetic Partner",
      partnerName: "Synthetic Partner",
      url: "https://demo.partner.test/landing",
      rawText: "Official Apple Partner. Premium support. iPhone Pro Maxx available now.",
      metadata: { oldLogoPresent: false }
    }),
    createAssetFromUrl({
      assetName: "Marketplace Listing",
      assetType: "marketplace_listing",
      ownerName: "Marketplace Ops",
      partnerName: "Synthetic Partner",
      url: "https://marketplace.test/listing",
      rawText: "Authorized reseller. iPhone Pro Maxx with lifetime support.",
      metadata: {}
    })
  ]);

  await Promise.all(assets.map((asset) => detectUsagesForAsset(asset._id.toString(), [source.sourceObjectId])));

  const scenario = await DemoScenarioModel.create({
    name: "apple-style",
    sourceObjectIds: [source.sourceObjectId],
    assetIds: assets.map((asset) => asset._id),
    metadata: { createdBy: "demoSeedService" }
  });

  return scenario;
};

export const runAppleStyleSourceUpdate = async () => {
  const scenario = await DemoScenarioModel.findOne({ name: "apple-style" });
  if (!scenario?.sourceObjectIds?.length) {
    await seedAppleStyleDemo();
  }

  const refreshedScenario = await DemoScenarioModel.findOne({ name: "apple-style" });
  const sourceObjectId = refreshedScenario?.sourceObjectIds?.[0]?.toString();
  if (!sourceObjectId) {
    throw new Error("Demo scenario missing source object");
  }

  const update = await updateSourceAndCreateEvent(sourceObjectId, {
    newVersion: "2.0",
    sourceText: "Use approved reseller-status language only when verified. Do not use Official Partner unless explicitly authorized.",
    changeType: "brand_rule_changed",
    severity: "high",
    summary: "Partner affiliation language restricted."
  });

  await DemoScenarioModel.updateOne({ name: "apple-style" }, { latestEventId: update.eventId });
  return update;
};

export const buildAppleStyleDashboard = async () => {
  const scenario = await DemoScenarioModel.findOne({ name: "apple-style" });
  if (!scenario) {
    await seedAppleStyleDemo();
  }

  const readyScenario = await DemoScenarioModel.findOne({ name: "apple-style" });
  if (!readyScenario) {
    throw new Error("Unable to load demo scenario");
  }

  let latestEventId = readyScenario.latestEventId?.toString();
  if (!latestEventId) {
    const update = await runAppleStyleSourceUpdate();
    latestEventId = update.eventId;
    await runImpactAnalysis(latestEventId);
  } else {
    const existingFindings = await FindingModel.countDocuments({ updateEventId: latestEventId });
    if (!existingFindings) {
      await runImpactAnalysis(latestEventId);
    }
  }

  const latestEvent = await SourceUpdateEventModel.findById(latestEventId);
  const findings = await FindingModel.find({ updateEventId: latestEventId }).populate("downstreamAssetId");

  return {
    summary: {
      sourcesMonitored: 38,
      downstreamAssetsLinked: 412,
      openHighRiskFindings: findings.filter((finding) => finding.severity === "high" && finding.status === "open").length,
      impactedPartners: 14,
      pendingReviewTasks: 31,
      avgSourceFreshness: 84
    },
    sourceUpdate: {
      title: "Brand Guidelines v2.0",
      updatedAgo: "2 hours ago",
      materialChanges: [
        "Logo usage rules updated",
        "Trademark disclaimer updated",
        "Partner affiliation language restricted",
        "Product naming list updated"
      ],
      downstreamImpact: [
        "12 partner pages affected",
        "5 marketplace listings affected",
        "3 sales decks affected"
      ]
    },
    impactGraph: {
      source: "Brand Guidelines v2.0",
      nodes: [
        { name: "Synthetic Affiliate Page", risk: "high" },
        { name: "Partner Landing Page", risk: "high" },
        { name: "Marketplace Listing", risk: "medium" },
        { name: "Sales Deck", risk: "high" },
        { name: "Email Campaign", risk: "medium" }
      ]
    },
    findings: findings.map((finding) => ({
      id: finding._id,
      severity: finding.severity,
      issueType: finding.issueType,
      issue: finding.issue,
      downstreamAsset:
        typeof finding.downstreamAssetId === "object" && "assetName" in finding.downstreamAssetId
          ? finding.downstreamAssetId.assetName
          : finding.downstreamAssetId.toString(),
      evidence: finding.thirdPartyEvidence,
      suggestedFix: finding.suggestedFix,
      status: finding.status
    })),
    latestEventId: latestEvent?._id.toString() ?? null
  };
};
