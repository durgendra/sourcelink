import { create } from "zustand";
import { sourceLinkService, type CreateSourceLinkInput, type CustomDemoInput } from "../services/sourceLinkService";
import { mockEmbedSnippet } from "../data/mockEmbeds";
import { mockFindings } from "../data/mockFindings";
import type { EmbedSnippet } from "../types/embed";
import type { Finding, FindingStatus } from "../types/finding";
import type { SourceObject, SourceType } from "../types/source";
import type { Audit } from "../types/audit";
import type { DownstreamAsset } from "../types/asset";
import type { Report } from "../types/report";

interface ToastMessage {
  id: number;
  title: string;
  description: string;
}

interface DemoStore {
  sources: SourceObject[];
  findings: Finding[];
  audit: Audit | null;
  assets: DownstreamAsset[];
  report: Report | null;
  selectedFinding: Finding | null;
  embed: EmbedSnippet;
  loading: boolean;
  toasts: ToastMessage[];
  createForm: CreateSourceLinkInput;
  customDemoForm: CustomDemoInput;
  initialize: () => Promise<void>;
  selectFinding: (finding: Finding | null) => void;
  updateFindingStatus: (findingId: string, status: FindingStatus) => Promise<void>;
  createSourceLink: () => Promise<void>;
  runCustomDemo: () => Promise<void>;
  updateCreateForm: (field: keyof CreateSourceLinkInput, value: string) => void;
  updateCustomDemoForm: (field: keyof CustomDemoInput, value: string) => void;
  pushToast: (title: string, description: string) => void;
  dismissToast: (id: number) => void;
}

const defaultForm: CreateSourceLinkInput = {
  name: "Partner Relationship Language",
  objectType: "Brand Rule" as SourceType,
  version: "1.0",
  updateMode: "Review-required",
  sourceText: "Authorized reseller",
  scope: "Partner relationship language",
  owner: "Brand Team",
  canonicalUrl: "https://sourcelink.ai/r/sl:demo:apple-style:partner-status"
};

const defaultCustomDemoForm: CustomDemoInput = {
  assetName: "Synthetic Affiliate Page",
  assetType: "webpage",
  partnerName: "Synthetic Partner",
  assetUrl: "https://demo.partner.test/apple-style",
  assetText: "Official Apple Partner. Buy iPhone Pro Maxx today. Lifetime support included.",
  updatedVersion: "2.0",
  updatedSourceText: "Use approved reseller-status language only when verified. Do not use Official Partner unless explicitly authorized.",
  changeSummary: "Partner affiliation language restricted."
};

export const useDemoStore = create<DemoStore>((set, get) => ({
  sources: [],
  findings: mockFindings,
  audit: null,
  assets: [],
  report: null,
  selectedFinding: mockFindings[0],
  embed: mockEmbedSnippet,
  loading: false,
  toasts: [],
  createForm: defaultForm,
  customDemoForm: defaultCustomDemoForm,
  initialize: async () => {
    set({ loading: true });
    const [audit, sources, findings, assets] = await Promise.all([
      sourceLinkService.getDashboard(),
      sourceLinkService.getSources(),
      sourceLinkService.getFindings(),
      sourceLinkService.getAssets()
    ]);
    const report = await sourceLinkService.getReport((audit as Audit & { latestEventId?: string }).latestEventId);
    set({
      audit,
      sources,
      findings,
      assets,
      report,
      selectedFinding: findings[0] ?? audit.findings[0] ?? null,
      loading: false
    });
  },
  selectFinding: (finding) => set({ selectedFinding: finding }),
  updateFindingStatus: async (findingId, status) => {
    const updated = await sourceLinkService.updateFindingStatus(findingId, status);
    set((state) => ({
      findings: state.findings.map((finding) => (finding.id === findingId ? { ...finding, status: updated.status } : finding)),
      audit: state.audit
        ? {
            ...state.audit,
            findings: state.audit.findings.map((finding) => (finding.id === findingId ? { ...finding, status: updated.status } : finding))
          }
        : state.audit,
      selectedFinding: state.selectedFinding?.id === findingId ? { ...state.selectedFinding, status: updated.status } : state.selectedFinding
    }));
  },
  createSourceLink: async () => {
    try {
      const result = await sourceLinkService.createSourceLink(get().createForm);
      set((state) => ({
        sources: [result.source, ...state.sources],
        embed: result.embed
      }));
      get().pushToast("Embed generated", "Source object created and snippets are ready to copy.");
    } catch {
      get().pushToast("Unable to generate embed", "The source object could not be created right now.");
      throw new Error("create_source_failed");
    }
  },
  runCustomDemo: async () => {
    set({ loading: true });

    try {
      const result = await sourceLinkService.runCustomDemo(get().createForm, get().customDemoForm);
      set((state) => ({
        sources: [result.source, ...state.sources.filter((source) => source.id !== result.source.id)],
        assets: [result.asset, ...state.assets.filter((asset) => asset.id !== result.asset.id)],
        embed: result.embed,
        findings: result.findings,
        audit: result.audit,
        report: result.report,
        selectedFinding: result.findings[0] ?? null
      }));

      get().pushToast(
        result.mode === "live" ? "Custom demo complete" : "Custom demo complete in local mode",
        result.mode === "live"
          ? "Source change, partner usage, findings, and risk profile are ready."
          : "The backend was unavailable, so SourceLink generated a local synthetic audit flow instead."
      );
    } catch {
      get().pushToast("Custom demo failed", "SourceLink could not run the workflow right now.");
      throw new Error("custom_demo_failed");
    } finally {
      set({ loading: false });
    }
  },
  updateCreateForm: (field, value) =>
    set((state) => ({
      createForm: {
        ...state.createForm,
        [field]: value
      }
    })),
  updateCustomDemoForm: (field, value) =>
    set((state) => ({
      customDemoForm: {
        ...state.customDemoForm,
        [field]: value
      }
    })),
  pushToast: (title, description) =>
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), title, description }]
    })),
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
}));
