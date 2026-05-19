import { api } from "./api";
import { mockAssets } from "../data/mockAssets";
import { mockAudits } from "../data/mockAudits";
import { mockEmbedSnippet } from "../data/mockEmbeds";
import { mockFindings } from "../data/mockFindings";
import { mockSources } from "../data/mockSources";
import { mockSourceVersions } from "../data/mockSourceVersions";
import type { FindingStatus } from "../types/finding";
import type { SourceObject, SourceType } from "../types/source";
import { titleToRef } from "../utils/format";
import type { Audit } from "../types/audit";
import type { Finding } from "../types/finding";
import type { DownstreamAsset } from "../types/asset";
import type { SourceVersion } from "../types/sourceVersion";
import type { Report } from "../types/report";

export interface CreateSourceLinkInput {
  name: string;
  objectType: SourceType;
  version: string;
  updateMode: "Auto-update" | "Review-required" | "Alert-only";
  sourceText: string;
  scope: string;
  owner: string;
  canonicalUrl: string;
}

export interface CustomDemoInput {
  assetName: string;
  assetType: "webpage" | "marketplace_listing" | "document";
  partnerName: string;
  assetUrl: string;
  assetText: string;
  updatedVersion: string;
  updatedSourceText: string;
  changeSummary: string;
}

export interface CustomDemoResult {
  source: SourceObject;
  embed: typeof mockEmbedSnippet;
  asset: DownstreamAsset;
  findings: Finding[];
  audit: Audit;
  report: Report;
  mode: "live" | "mock";
}

const toBackendSourceType = (type: SourceType) =>
  ({
    Claim: "claim",
    Logo: "logo",
    Disclaimer: "disclaimer",
    Document: "document",
    "Brand Rule": "brand_rule",
    "Product Spec": "product_spec",
    Warranty: "warranty",
    Certification: "certification"
  }[type]);

const toFrontendSourceType = (type: string): SourceType =>
  ({
    claim: "Claim",
    logo: "Logo",
    disclaimer: "Disclaimer",
    document: "Document",
    brand_rule: "Brand Rule",
    product_spec: "Product Spec",
    warranty: "Warranty",
    certification: "Certification",
    code_example: "Document"
  }[type] as SourceType);

const toFrontendFindingStatus = (status: string): FindingStatus =>
  ({
    open: "Open",
    accepted: "Accepted",
    dismissed: "Dismissed",
    needs_review: "Needs Review",
    fixed: "Resolved"
  }[status] as FindingStatus);

const toBackendFindingStatus = (status: FindingStatus) =>
  ({
    Open: "open",
    Accepted: "accepted",
    Dismissed: "dismissed",
    "Needs Review": "needs_review",
    "Needs Legal Review": "needs_review",
    Resolved: "fixed"
  }[status]);

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const mapSource = (source: any): SourceObject => ({
  id: String(source._id ?? source.id),
  sourceId: source.sourceId,
  name: source.name,
  objectType: toFrontendSourceType(source.objectType),
  ownerName: source.ownerName,
  ownerDomain: source.ownerDomain,
  status: capitalize(source.status) as SourceObject["status"],
  currentVersion: source.currentVersionId?.version ?? source.currentVersion ?? "1.0",
  canonicalUrl: source.canonicalUrl,
  scope: typeof source.scope === "string" ? source.scope : Object.values(source.scope ?? {}).join(", "),
  sourceText: source.currentVersionId?.sourceText ?? source.sourceText ?? ""
});

const mapSourceVersion = (version: any): SourceVersion => ({
  id: String(version._id ?? version.id),
  sourceObjectId: String(version.sourceObjectId?._id ?? version.sourceObjectId),
  version: version.version,
  title: `Source Version v${version.version}`,
  sourceText: version.sourceText,
  createdAt: version.createdAt,
  status: version.status === "current" ? "Current" : "Previous"
});

const mapFinding = (finding: any): Finding => ({
  id: String(finding._id ?? finding.id),
  severity: capitalize(finding.severity) as Finding["severity"],
  issueType: finding.issueType?.replaceAll("_", " ") ?? "Finding",
  issue: finding.issue,
  source:
    finding.sourceObjectId?.name ??
    finding.approvedSourceEvidence?.split(",")[0] ??
    finding.source ??
    "Approved source",
  downstreamAsset:
    finding.downstreamAssetId?.assetName ??
    finding.downstreamAsset ??
    "Downstream asset",
  evidence: finding.thirdPartyEvidence ?? finding.evidence ?? "",
  approvedSource: finding.approvedSourceEvidence ?? finding.approvedSource ?? "Approved source evidence",
  whyItMatters: finding.reason ?? finding.whyItMatters ?? "SourceLink detected a mismatch between downstream content and approved source guidance.",
  suggestedFix: finding.suggestedFix,
  status: toFrontendFindingStatus(finding.status ?? "open"),
  module: finding.module ?? (String(finding.issueType).includes("logo") ? "Brand Audit" : "Claim Audit"),
  confidence: finding.confidence ?? 0.85
});

const mapDashboardToAudit = (payload: any): Audit => ({
  id: "audit-apple-style",
  name: "Apple-style Brand Asset Drift Demo",
  subtitle: "Source changed → downstream content is stale → SourceLink found it → evidence and suggested fix are ready.",
  latestEventId: payload.latestEventId ?? null,
  summary: payload.summary,
  sourceUpdate: payload.sourceUpdate,
  impactedAssets: (payload.impactGraph?.nodes ?? []).map((node: any, index: number) => ({
    id: `impact-${index}`,
    name: node.name,
    risk: capitalize(node.risk)
  })),
  impactGraph: payload.impactGraph,
  findings: (payload.findings ?? []).map((finding: any) =>
    mapFinding({
      ...finding,
      issueType: finding.issueType ?? finding.issue?.toLowerCase().replaceAll(/[^a-z0-9]+/g, "_"),
      thirdPartyEvidence: finding.evidence
    })
  ),
  tasks: [],
  report: mockAudits[0].report
});

const createAuditFromWorkflow = ({
  source,
  asset,
  findings,
  impact,
  report,
  eventId,
  updatedVersion,
  changeSummary
}: {
  source: SourceObject;
  asset: DownstreamAsset;
  findings: Finding[];
  impact: any;
  report: Report;
  eventId: string;
  updatedVersion: string;
  changeSummary: string;
}): Audit => {
  const highCount = findings.filter((finding) => finding.severity === "High").length;
  const mediumCount = findings.filter((finding) => finding.severity === "Medium").length;
  const impactedAssets = Array.from(new Map(findings.map((finding) => [finding.downstreamAsset, finding])).values()).map((finding, index) => ({
    id: `impact-${index}`,
    name: finding.downstreamAsset,
    risk: (finding.severity === "High" || finding.severity === "Critical" ? "High" : "Medium") as "High" | "Medium" | "Low"
  }));

  return {
    id: "audit-custom-demo",
    name: `${source.name} Drift Demo`,
    subtitle: "Source changed → downstream content is stale → SourceLink found it → evidence and suggested fix are ready.",
    latestEventId: eventId,
    summary: {
      sourcesMonitored: 1,
      downstreamAssetsLinked: 1,
      openHighRiskFindings: highCount,
      impactedPartners: 1,
      pendingReviewTasks: impact.tasksCreated ?? findings.length,
      avgSourceFreshness: 52
    },
    sourceUpdate: {
      title: `${source.name} v${updatedVersion}`,
      updatedAgo: "Updated just now",
      materialChanges: [changeSummary],
      downstreamImpact: [`${impact.impactedAssets ?? 1} downstream asset affected`, `${highCount} high-risk findings`, `${mediumCount} medium-risk findings`]
    },
    impactedAssets,
    impactGraph: {
      source: `${source.name} v${updatedVersion}`,
      nodes: impactedAssets.map((item) => ({
        name: item.name,
        risk: item.risk === "High" ? "high" : "medium"
      }))
    },
    findings,
    tasks: [],
    report
  };
};

const createFallbackFinding = ({
  id,
  severity,
  issueType,
  issue,
  sourceName,
  assetName,
  evidence,
  approvedSource,
  whyItMatters,
  suggestedFix,
  module,
  confidence
}: {
  id: string;
  severity: Finding["severity"];
  issueType: string;
  issue: string;
  sourceName: string;
  assetName: string;
  evidence: string;
  approvedSource: string;
  whyItMatters: string;
  suggestedFix: string;
  module: Finding["module"];
  confidence: number;
}): Finding => ({
  id,
  severity,
  issueType,
  issue,
  source: sourceName,
  downstreamAsset: assetName,
  evidence,
  approvedSource,
  whyItMatters,
  suggestedFix,
  status: "Open",
  module,
  confidence
});

const createFallbackWorkflowResult = (
  sourceInput: CreateSourceLinkInput,
  demoInput: CustomDemoInput,
  created: { source: SourceObject; embed: typeof mockEmbedSnippet }
): CustomDemoResult => {
  const source: SourceObject = {
    ...created.source,
    currentVersion: demoInput.updatedVersion,
    sourceText: demoInput.updatedSourceText
  };

  const asset: DownstreamAsset = {
    id: `asset-${titleToRef(demoInput.assetName)}`,
    assetName: demoInput.assetName,
    assetType: capitalize(demoInput.assetType.replaceAll("_", " ")) as DownstreamAsset["assetType"],
    ownerName: sourceInput.owner,
    partnerName: demoInput.partnerName,
    url: demoInput.assetUrl,
    excerpt: demoInput.assetText,
    risk: "Medium",
    status: "Stale"
  };

  const text = demoInput.assetText.toLowerCase();
  const findings: Finding[] = [];
  const approvedSource = `${source.name} v${demoInput.updatedVersion}`;

  if (text.includes("official") && text.includes("partner")) {
    findings.push(
      createFallbackFinding({
        id: "finding-affiliation",
        severity: "High",
        issueType: "unsupported affiliation claim",
        issue: `Unsupported "${demoInput.assetText.match(/official[^.?!]*/i)?.[0] ?? "Official Partner"}" language`,
        sourceName: source.name,
        assetName: asset.assetName,
        evidence: demoInput.assetText.match(/official[^.?!]*/i)?.[0] ?? "Official Partner",
        approvedSource,
        whyItMatters: "The downstream page implies a relationship that is no longer approved by the updated source guidance.",
        suggestedFix: "Remove the affiliation claim or replace it with approved reseller-status language after verification.",
        module: "Brand Audit",
        confidence: 0.91
      })
    );
  }

  if (text.includes("pro maxx")) {
    findings.push(
      createFallbackFinding({
        id: "finding-product-name",
        severity: "Medium",
        issueType: "incorrect product name",
        issue: 'Incorrect product name: "iPhone Pro Maxx"',
        sourceName: source.name,
        assetName: asset.assetName,
        evidence: "iPhone Pro Maxx",
        approvedSource,
        whyItMatters: "Unapproved naming creates product accuracy and brand-governance risk downstream.",
        suggestedFix: 'Replace "iPhone Pro Maxx" with the approved product name from the source document.',
        module: "Claim Audit",
        confidence: 0.88
      })
    );
  }

  if (text.includes("lifetime support")) {
    findings.push(
      createFallbackFinding({
        id: "finding-support-claim",
        severity: "High",
        issueType: "unsupported support claim",
        issue: 'Unsupported "lifetime support" claim',
        sourceName: source.name,
        assetName: asset.assetName,
        evidence: "Lifetime support included",
        approvedSource,
        whyItMatters: "The reseller content promises support terms that are not backed by the approved source.",
        suggestedFix: 'Remove "lifetime support" or replace it with approved support language.',
        module: "Claim Audit",
        confidence: 0.9
      })
    );
  }

  if (!text.includes("trademark")) {
    findings.push(
      createFallbackFinding({
        id: "finding-disclaimer",
        severity: "High",
        issueType: "missing trademark disclaimer",
        issue: "Missing trademark disclaimer",
        sourceName: source.name,
        assetName: asset.assetName,
        evidence: "No trademark disclaimer detected in provided partner content.",
        approvedSource,
        whyItMatters: "Required legal language is missing from the downstream asset after the updated source rules.",
        suggestedFix: "Add the required trademark disclaimer from the approved source document.",
        module: "Brand Audit",
        confidence: 0.84
      })
    );
  }

  if (findings.length === 0) {
    findings.push(
      createFallbackFinding({
        id: "finding-review",
        severity: "Medium",
        issueType: "stale source version",
        issue: "Source changed and downstream content requires review",
        sourceName: source.name,
        assetName: asset.assetName,
        evidence: demoInput.assetText.slice(0, 140),
        approvedSource,
        whyItMatters: "The upstream source changed, so the downstream asset should be reviewed for alignment.",
        suggestedFix: "Review the partner content against the latest source version and update any stale language.",
        module: "Claim Audit",
        confidence: 0.78
      })
    );
  }

  asset.risk = findings.some((finding) => finding.severity === "High" || finding.severity === "Critical") ? "High" : "Medium";

  const report: Report = {
    id: "report-custom-demo",
    reportType: "JSON",
    generatedAt: new Date().toLocaleDateString(),
    executiveSummary: `SourceLink detected ${findings.length} downstream issue${findings.length === 1 ? "" : "s"} after the approved source changed from v${sourceInput.version} to v${demoInput.updatedVersion}.`,
    sourceChange: [sourceInput.sourceText, demoInput.updatedSourceText],
    impactedAssets: [asset.assetName],
    highRiskFindings: findings.filter((finding) => finding.severity === "High" || finding.severity === "Critical").map((finding) => finding.issue),
    evidence: findings.map((finding) => finding.evidence),
    suggestedFixes: findings.map((finding) => finding.suggestedFix),
    reviewTasks: findings.map((finding) => `Review ${finding.downstreamAsset}: ${finding.issue}`),
    disclaimer: "Synthetic demo output generated locally because the backend workflow was unavailable."
  };

  const audit = createAuditFromWorkflow({
    source,
    asset,
    findings,
    impact: {
      impactedAssets: 1,
      tasksCreated: findings.length
    },
    report,
    eventId: "event-custom-demo-local",
    updatedVersion: demoInput.updatedVersion,
    changeSummary: demoInput.changeSummary
  });

  return {
    source,
    embed: created.embed,
    asset,
    findings,
    audit,
    report,
    mode: "mock"
  };
};

export const sourceLinkService = {
  async getDashboard() {
    try {
      await api.post("/demo/apple-style/create");
      const { data } = await api.get("/demo/apple-style/dashboard");
      return mapDashboardToAudit(data);
    } catch {
      return mockAudits[0];
    }
  },
  async getAudit(auditId: string) {
    const audit = await this.getDashboard();
    return audit.id === auditId ? audit : audit;
  },
  async getSources() {
    try {
      const { data } = await api.get("/sources");
      return data.map(mapSource);
    } catch {
      return mockSources;
    }
  },
  async getSourceVersions(sourceObjectId: string) {
    try {
      const { data } = await api.get(`/sources/${sourceObjectId}/versions`);
      return data.map(mapSourceVersion);
    } catch {
      return mockSourceVersions.filter((version) => version.sourceObjectId === sourceObjectId);
    }
  },
  async getAssets() {
    try {
      const { data } = await api.get("/assets");
      return data.map(
        (asset: any): DownstreamAsset => ({
          id: String(asset._id ?? asset.id),
          assetName: asset.assetName,
          assetType: capitalize(String(asset.assetType).replaceAll("_", " ")) as DownstreamAsset["assetType"],
          ownerName: asset.ownerName,
          partnerName: asset.partnerName,
          url: asset.url ?? undefined,
          excerpt: asset.cleanedText ?? asset.rawText ?? "",
          risk: "Medium",
          status: "Linked"
        })
      );
    } catch {
      return mockAssets;
    }
  },
  async getFindings() {
    try {
      const { data } = await api.get("/findings");
      return data.map(mapFinding);
    } catch {
      return mockFindings;
    }
  },
  async updateFindingStatus(findingId: string, status: FindingStatus) {
    try {
      const { data } = await api.patch(`/findings/${findingId}/status`, {
        status: toBackendFindingStatus(status)
      });
      return mapFinding(data);
    } catch {
      return mockFindings.map((finding) => (finding.id === findingId ? { ...finding, status } : finding)).find((finding) => finding.id === findingId)!;
    }
  },
  async createSourceLink(input: CreateSourceLinkInput): Promise<{ source: SourceObject; embed: typeof mockEmbedSnippet }> {
    try {
      const createResponse = await api.post("/sources", {
        name: input.name,
        objectType: toBackendSourceType(input.objectType),
        ownerName: input.owner,
        ownerDomain: "demo.sourcelink.ai",
        canonicalUrl: input.canonicalUrl,
        sourceText: input.sourceText,
        version: input.version,
        scope: {
          label: input.scope
        }
      });

      const sourceObjectId = createResponse.data.sourceObjectId;
      const [sourceResponse, embedResponse] = await Promise.all([
        api.get(`/sources/${sourceObjectId}`),
        api.post("/embeds/generate", {
          sourceObjectId,
          embedType: "inline_html",
          updateMode: input.updateMode.toLowerCase()
        })
      ]);

      return {
        source: mapSource(sourceResponse.data),
        embed: embedResponse.data
      };
    } catch {
      const ref = `sl:demo:${titleToRef(input.name)}`;
      return {
        source: {
          id: `source-${titleToRef(input.name)}`,
          sourceId: ref,
          name: input.name,
          objectType: input.objectType,
          ownerName: input.owner,
          ownerDomain: "demo.sourcelink.ai",
          status: "Active",
          currentVersion: input.version,
          canonicalUrl: input.canonicalUrl,
          scope: input.scope,
          sourceText: input.sourceText
        },
        embed: {
          inlineHtml: `<span data-sl-ref="${ref}" data-sl-version="${input.version}" data-sl-mode="${input.updateMode.toLowerCase()}">${input.sourceText}</span>`,
          jsonLd: `<script type="application/ld+json">\n{\n  "@context": "https://schema.sourcelink.ai/v1",\n  "@type": "SourceLinkReference",\n  "sourceId": "${ref}",\n  "version": "${input.version}",\n  "canonicalUrl": "${input.canonicalUrl}"\n}\n</script>`,
          badgeWidget: `<script src="https://cdn.sourcelink.ai/badge.js" data-sourcelink-ref="${ref}"></script>`
        }
      };
    }
  },
  async getReport(eventId?: string): Promise<Report> {
    if (!eventId) {
      return mockAudits[0].report;
    }
    try {
      const { data } = await api.post("/reports", {
        sourceUpdateEventId: eventId,
        format: "json"
      });
      return {
        ...mockAudits[0].report,
        id: String(data._id ?? data.id),
        reportType: String(data.reportType ?? "JSON").toUpperCase() as Report["reportType"],
        generatedAt: new Date(data.createdAt ?? Date.now()).toLocaleDateString()
      };
    } catch {
      return mockAudits[0].report;
    }
  },
  async runCustomDemo(sourceInput: CreateSourceLinkInput, demoInput: CustomDemoInput): Promise<CustomDemoResult> {
    const created = await this.createSourceLink(sourceInput);

    try {
      const assetResponse = await api.post("/assets/url", {
        assetName: demoInput.assetName,
        assetType: demoInput.assetType,
        ownerName: sourceInput.owner,
        partnerName: demoInput.partnerName,
        url: demoInput.assetUrl,
        rawText: demoInput.assetText
      });

      const assetId = String(assetResponse.data._id ?? assetResponse.data.id);
      await api.post(`/assets/${assetId}/detect-usages`, {
        sourceObjectIds: [created.source.id]
      });

      const updateResponse = await api.post(`/sources/${created.source.id}/update`, {
        newVersion: demoInput.updatedVersion,
        sourceText: demoInput.updatedSourceText,
        changeType: "brand_rule_changed",
        severity: "high",
        summary: demoInput.changeSummary
      });

      const eventId = updateResponse.data.eventId;
      const impactResponse = await api.post(`/source-events/${eventId}/run-impact`);
      const findingsResponse = await api.get("/findings");
      const freshFindings = findingsResponse.data
        .map(mapFinding)
        .filter((finding: Finding) => finding.downstreamAsset === demoInput.assetName || finding.source === created.source.name || finding.source.includes(sourceInput.name));

      const report = await this.getReport(eventId);
      const source: SourceObject = {
        ...created.source,
        currentVersion: demoInput.updatedVersion,
        sourceText: demoInput.updatedSourceText
      };
      const asset: DownstreamAsset = {
        id: assetId,
        assetName: demoInput.assetName,
        assetType: capitalize(demoInput.assetType.replaceAll("_", " ")) as DownstreamAsset["assetType"],
        ownerName: sourceInput.owner,
        partnerName: demoInput.partnerName,
        url: demoInput.assetUrl,
        excerpt: demoInput.assetText,
        risk: freshFindings.some((finding) => finding.severity === "High" || finding.severity === "Critical") ? "High" : "Medium",
        status: "Stale"
      };

      return {
        source,
        embed: created.embed,
        asset,
        findings: freshFindings,
        audit: createAuditFromWorkflow({
          source,
          asset,
          findings: freshFindings,
          impact: impactResponse.data,
          report,
          eventId,
          updatedVersion: demoInput.updatedVersion,
          changeSummary: demoInput.changeSummary
        }),
        report,
        mode: "live"
      };
    } catch {
      return createFallbackWorkflowResult(sourceInput, demoInput, created);
    }
  }
};
