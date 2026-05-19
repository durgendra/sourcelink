import type { DownstreamAssetDocument } from "../../models/DownstreamAsset.model";
import type { SourceObjectDocument } from "../../models/SourceObject.model";
import type { SourceVersionDocument } from "../../models/SourceVersion.model";
import type { SourceLinkUsageDocument } from "../../models/SourceLinkUsage.model";
import type { Severity } from "../../types/finding.types";
import { extractMockClaims } from "./mockClaimExtractor.service";
import { generateMockSuggestedFix } from "./mockSuggestedFix.service";

type GeneratedFinding = {
  usageId?: string;
  severity: Severity;
  issueType:
    | "unsupported_affiliation_language"
    | "incorrect_product_name"
    | "missing_disclaimer"
    | "unsupported_claim"
    | "outdated_logo"
    | "stale_source_version";
  issue: string;
  thirdPartyEvidence: string;
  approvedSourceEvidence: string;
  reason: string;
  suggestedFix: string;
  confidence: number;
};

export const generateMockFindings = ({
  asset,
  source,
  currentVersion,
  usages
}: {
  asset: DownstreamAssetDocument;
  source: SourceObjectDocument;
  currentVersion: SourceVersionDocument;
  usages: SourceLinkUsageDocument[];
}): GeneratedFinding[] => {
  const claims = extractMockClaims(asset.cleanedText || asset.rawText);
  const findings: GeneratedFinding[] = [];

  if (claims.partnerStatus?.includes("official apple partner")) {
    findings.push({
      usageId: usages.find((usage) => String(usage.detectedText ?? "").toLowerCase().includes("official apple partner"))?._id?.toString(),
      severity: "high",
      issueType: "unsupported_affiliation_language",
      issue: "Unsupported \"Official Apple Partner\" language detected.",
      thirdPartyEvidence: "Official Apple Partner",
      approvedSourceEvidence: currentVersion.sourceText,
      reason: "Partner affiliation language exceeds approved reseller-status language.",
      suggestedFix: generateMockSuggestedFix("unsupported_affiliation_language"),
      confidence: 0.96
    });
  }

  if (claims.incorrectProductName) {
    findings.push({
      usageId: usages.find((usage) => String(usage.detectedText ?? "").toLowerCase().includes("iphone pro maxx"))?._id?.toString(),
      severity: "medium",
      issueType: "incorrect_product_name",
      issue: "Incorrect product name detected.",
      thirdPartyEvidence: "iPhone Pro Maxx",
      approvedSourceEvidence: "Use approved product name from current naming list.",
      reason: "Product naming does not match approved source list.",
      suggestedFix: generateMockSuggestedFix("incorrect_product_name"),
      confidence: 0.9
    });
  }

  if (!claims.disclaimerPresent && /(iphone|apple)/i.test(asset.cleanedText || asset.rawText)) {
    findings.push({
      severity: "high",
      issueType: "missing_disclaimer",
      issue: "Missing trademark disclaimer.",
      thirdPartyEvidence: "No trademark disclaimer found in asset text.",
      approvedSourceEvidence: "Include required trademark disclaimer.",
      reason: "Trademark language is required when brand/product naming is present.",
      suggestedFix: generateMockSuggestedFix("missing_disclaimer"),
      confidence: 0.91
    });
  }

  if (claims.supportClaim) {
    findings.push({
      usageId: usages.find((usage) => String(usage.detectedText ?? "").toLowerCase().includes("lifetime support"))?._id?.toString(),
      severity: "high",
      issueType: "unsupported_claim",
      issue: "Unsupported \"lifetime support\" claim detected.",
      thirdPartyEvidence: "Lifetime support included.",
      approvedSourceEvidence: currentVersion.sourceText,
      reason: "Support claim is not present in approved source content.",
      suggestedFix: generateMockSuggestedFix("unsupported_claim"),
      confidence: 0.94
    });
  }

  if (claims.oldLogo || asset.metadata?.oldLogoPresent) {
    findings.push({
      severity: "medium",
      issueType: "outdated_logo",
      issue: "Old logo detected.",
      thirdPartyEvidence: "Asset metadata indicates old logo present.",
      approvedSourceEvidence: "Use current approved logo asset only.",
      reason: "Legacy logo usage conflicts with current brand guidance.",
      suggestedFix: generateMockSuggestedFix("outdated_logo"),
      confidence: 0.82
    });
  }

  const staleUsages = usages.filter((usage) => usage.status === "stale");
  for (const usage of staleUsages) {
    findings.push({
      usageId: usage._id.toString(),
      severity: "medium",
      issueType: "stale_source_version",
      issue: `Asset still references source version ${usage.usedVersion}.`,
      thirdPartyEvidence: usage.detectedText,
      approvedSourceEvidence: currentVersion.sourceText,
      reason: "Downstream usage is behind the current approved source version.",
      suggestedFix: generateMockSuggestedFix("stale_source_version"),
      confidence: 0.78
    });
  }

  return findings.map((finding) => ({
    ...finding,
    approvedSourceEvidence: finding.approvedSourceEvidence || source.name
  }));
};
