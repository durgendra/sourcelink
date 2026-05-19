import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Code,
  FileCheck,
  FileText,
  Link2,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { PublicNavbar } from "../components/layout/PublicNavbar";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { cn } from "../lib/utils";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background selection:bg-brand-blue selection:text-white">
      <PublicNavbar />

      <section className="pt-32 pb-20 px-4 hero-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/5 border border-brand-blue/10 rounded-full mb-6">
              <Badge variant="info">New</Badge>
              <span className="text-xs font-medium text-brand-blue">
                AI governance for source-linked content
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-brand-navy mb-6 leading-[1.1]">
              Keep third-party content{" "}
              <span className="text-brand-blue">synced</span> with the source of
              truth.
            </h1>
            <p className="text-xl text-text-secondary mb-10 leading-relaxed max-w-xl">
              SourceLink maps partner claims, brand assets, documents, and
              listings back to approved sources, detects stale downstream usage,
              and generates evidence-backed update workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link to="/demo">Run Sample Demo</Link>
              </Button>
              {/* <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                View Example Report
              </Button> */}
            </div>
            <div className="mt-8 flex items-center gap-3 text-text-muted">
              <CheckCircle2 className="w-5 h-5 text-severity-success" />
              <span className="text-sm">
                Built for channel, legal, brand, product marketing, and partner
                enablement teams.
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-border p-6 max-h-[600px] overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Source Updated</h3>
                    <p className="text-xs text-text-muted">
                      Brand Guidelines v2.0
                    </p>
                  </div>
                </div>
                <Badge variant="warning">Impact Detected</Badge>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    ["17", "Assets Impacted"],
                    ["8", "High-Risk Findings"],
                    ["Ready", "Suggested Fixes"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="bg-surface-muted p-4 rounded-xl border border-border text-center"
                    >
                      <div className="text-2xl font-bold text-brand-navy">
                        {value}
                      </div>
                      <div className="text-[10px] text-text-muted uppercase tracking-wider">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-severity-high/5 border border-severity-high/10 p-5 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Selected Finding
                    </h4>
                    <Badge variant="error">High Risk</Badge>
                  </div>
                  <p className="text-sm font-bold text-brand-navy mb-1">
                    “Official Apple Partner”
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">
                    Issue: Unsupported affiliation language found on Synthetic
                    Affiliate Page hero headline.
                  </p>
                  <div className="p-3 bg-white rounded-lg border border-border text-[10px] mb-4">
                    <span className="font-bold">Source:</span> Brand Guidelines
                    v2.0 — Partner Relationship Language
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-severity-success/5 border border-severity-success/20 rounded-lg">
                      <div className="text-[10px] font-bold text-severity-success uppercase mb-1">
                        Suggested Fix
                      </div>
                      <p className="text-xs text-brand-navy">
                        Remove or replace with approved reseller-status
                        language.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-brand-navy hover:bg-brand-blue border-none flex-1"
                      >
                        Apply fix
                      </Button>
                      <Button size="sm" variant="secondary" className="flex-1">
                        Evidence
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-blue/10 blur-[100px] rounded-full -z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-cyan/10 blur-[100px] rounded-full -z-0"></div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-brand-navy mb-6">
              Approved content changes. The internet does not update itself.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Stale claims",
                description:
                  "Partners keep outdated warranty, availability, or certification language.",
                icon: AlertTriangle,
                color: "text-severity-warning",
              },
              {
                title: "Broken source lineage",
                description:
                  "Teams do not know which partner assets depend on which source.",
                icon: Link2,
                color: "text-brand-blue",
              },
              {
                title: "Brand drift",
                description:
                  "Old logos, product names, images, and disclaimers remain live across third-party pages.",
                icon: ShieldCheck,
                color: "text-brand-violet",
              },
              {
                title: "Manual remediation",
                description:
                  "Legal, brand, and channel teams rely on spreadsheets, emails, and one-off reviews.",
                icon: Search,
                color: "text-text-muted",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -5 }}
                className="p-8 border border-border rounded-card bg-surface hover:shadow-lg transition-all"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-surface-muted",
                    item.color
                  )}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-surface-muted">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-4xl font-bold tracking-tight text-brand-navy mb-6">
                Dependency management for digital content.
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-8 font-medium">
                Software has dependency graphs. Content does not. SourceLink
                creates a dependency map between original sources and every
                downstream use.
              </p>
              <div className="space-y-6">
                {[
                  "Source changed → downstream impact detected → update tasks created",
                  "Track source-linked content objects across your ecosystem",
                ].map((line) => (
                  <div key={line} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                    </div>
                    <p className="text-text-primary text-sm font-medium">
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full bg-white p-8 rounded-card border border-border relative">
              <div className="flex flex-col items-center gap-12 relative py-10">
                <div className="z-10 text-center">
                  <div className="px-6 py-3 bg-brand-navy text-white rounded-xl font-bold text-sm shadow-xl flex items-center gap-3 mx-auto w-fit">
                    <FileCheck className="w-5 h-5" />
                    Brand Guidelines v2.0
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 z-10">
                  {[
                    { name: "Synthetic Affiliate Page", risk: "high" },
                    { name: "Partner Landing Page", risk: "high" },
                    { name: "Marketplace Listing", risk: "medium" },
                    { name: "Sales Deck", risk: "high" },
                  ].map((node) => (
                    <div
                      key={node.name}
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className={cn(
                          "w-full py-2 px-3 rounded-lg border text-[10px] font-bold text-center h-12 flex items-center justify-center leading-tight shadow-sm",
                          node.risk === "high"
                            ? "bg-white border-severity-high/30 text-brand-navy ring-2 ring-severity-high/5"
                            : "bg-white border-severity-warning/30 text-brand-navy ring-2 ring-severity-warning/5"
                        )}
                      >
                        {node.name}
                      </div>
                      <Badge
                        variant={node.risk === "high" ? "error" : "warning"}
                      >
                        {node.risk === "high" ? "High Risk" : "Medium Risk"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-brand-navy mb-4">
              One platform. Two first modules.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Partner Claim Audit",
                description:
                  "Detect inaccurate, unsupported, outdated, or overgeneralized claims in partner webpages, sales decks, listings, and proposals.",
                icon: BarChart3,
                tone: "brand-blue",
                chips: [
                  "Warranty",
                  "Availability",
                  "Certification",
                  "Geography",
                  "Product Spec",
                  "Licensing",
                  "SKU Scope",
                  "Security",
                ],
              },
              {
                title: "Brand Asset Audit",
                description:
                  "Detect outdated logos, incorrect product names, missing disclaimers, and unauthorized affiliation language.",
                icon: ShieldCheck,
                tone: "brand-violet",
                chips: [
                  "Logo usage",
                  "Product naming",
                  "Taglines",
                  "Disclaimers",
                  "Co-branding",
                  "Imagery",
                  "Partner status",
                  "Trademark",
                ],
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="p-10 group border border-border hover:shadow-2xl transition-all overflow-hidden relative text-left"
              >
                <div className="flex flex-col h-full">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-8",
                      item.tone === "brand-blue"
                        ? "bg-brand-blue/10"
                        : "bg-brand-violet/10"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-7 h-7",
                        item.tone === "brand-blue"
                          ? "text-brand-blue"
                          : "text-brand-violet"
                      )}
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-brand-navy mb-4">
                    {item.title}
                  </h3>
                  <p className="text-lg text-text-secondary mb-8">
                    {item.description}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-auto">
                    {item.chips.map((chip) => (
                      <div
                        key={chip}
                        className="flex items-center gap-2 text-xs text-text-primary px-3 py-2 bg-surface-muted rounded-lg font-bold"
                      >
                        <div
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            item.tone === "brand-blue"
                              ? "bg-brand-blue"
                              : "bg-brand-violet"
                          )}
                        />
                        {chip}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              From source change to approved update.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              {
                title: "Create source object",
                desc: "Define approved claim, logo, disclaimer, brand rule, or warranty language.",
                icon: FileText,
              },
              {
                title: "Generate tag",
                desc: "Create copy-paste HTML, JSON-LD, or badge snippet.",
                icon: Code,
              },
              {
                title: "Link content",
                desc: "Partner pages, PDFs, decks, and listings reference the source object.",
                icon: Link2,
              },
              {
                title: "Detect changes",
                desc: "Identify updates, even if the new document appears at a new URL.",
                icon: RefreshCw,
              },
              {
                title: "Identify impact",
                desc: "Find stale assets, classify risk, and create review-ready fixes.",
                icon: BarChart3,
              },
            ].map((step, index) => (
              <div key={step.title} className="relative group">
                <div className="mb-6 w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-bold text-brand-blue mb-2 tracking-widest uppercase">
                  Step {index + 1}
                </div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(37,99,235,0.2),transparent_50%)]"></div>
      </section>

      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-navy mb-4">
              See source drift in action.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Apple-style Brand Asset Drift Demo",
                type: "Brand Asset",
                severity: "High risk",
                desc: "A synthetic third-party page uses old logo assets, unsupported “Official Partner” language, incorrect product naming, and missing trademark disclaimers.",
              },
              {
                title: "Cisco Meraki-style Partner Claim Demo",
                type: "Partner Claim",
                severity: "High risk",
                desc: "A synthetic reseller page claims global availability, no license requirements, and lifetime warranty.",
              },
              {
                title: "Zebra-style Product Hierarchy Demo",
                type: "Product Hierarchy",
                severity: "Medium risk",
                desc: "A synthetic distributor listing applies a SKU-specific feature to an entire product family.",
              },
            ].map((demo) => (
              <Card
                key={demo.title}
                className="group hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="p-8">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Badge variant="info">{demo.type}</Badge>
                    <Badge
                      variant={
                        demo.severity === "High risk" ? "error" : "warning"
                      }
                    >
                      {demo.severity}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3 min-h-[3.5rem]">
                    {demo.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 h-20 overflow-hidden">
                    {demo.desc}
                  </p>
                  <Button
                    variant="secondary"
                    className="w-full gap-2 group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-all"
                  >
                    Run Sample Demo <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-xs text-text-muted italic bg-surface-muted inline-block px-4 py-2 rounded-full border border-border">
              Synthetic demo inspired by realistic public content. No customer
              relationship is implied.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-navy mb-4">
              Evidence-backed findings, not black-box AI.
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto font-medium">
              SourceLink provides high-confidence observations with direct
              evidence citations and suggested fixes.
            </p>
          </div>
          <Card className="overflow-hidden border border-border shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-surface-muted/50 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border">
                    <th className="px-8 py-5">Finding</th>
                    <th className="px-6 py-5">Module</th>
                    <th className="px-6 py-5">Severity</th>
                    <th className="px-6 py-5">Evidence / Impact</th>
                    <th className="px-6 py-5">Suggested Fix</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      f: "“Official Apple Partner” unsupported",
                      m: "Brand Audit",
                      s: "High",
                      e: "No verified partner-status source",
                      x: "Replace or remove affiliation language",
                    },
                    {
                      f: "“Available globally”",
                      m: "Claim Audit",
                      s: "High",
                      e: "Source says U.S. and Canada only",
                      x: "Use approved regional wording",
                    },
                    {
                      f: "Old logo detected",
                      m: "Brand Audit",
                      s: "Medium",
                      e: "Brand Guidelines v2.0 shows new logo",
                      x: "Replace with approved logo",
                    },
                    {
                      f: "“5-year warranty”",
                      m: "Claim Audit",
                      s: "High",
                      e: "Source says standard 3-year warranty",
                      x: "Correct warranty language",
                    },
                    {
                      f: "Feature applied to all models",
                      m: "Claim Audit",
                      s: "High",
                      e: "Source says selected SKU only",
                      x: "Qualify by SKU",
                    },
                  ].map((row) => (
                    <tr
                      key={row.f}
                      className="bg-white hover:bg-surface-muted/30 transition-colors border-b border-border last:border-none group"
                    >
                      <td className="px-8 py-6">
                        <div className="text-sm font-bold text-brand-navy">
                          {row.f}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="text-xs font-semibold text-text-secondary">
                          {row.m}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <Badge variant={row.s === "High" ? "error" : "warning"}>
                          {row.s}
                        </Badge>
                      </td>
                      <td className="px-6 py-6 text-xs text-text-secondary font-medium italic">
                        {row.e}
                      </td>
                      <td className="px-6 py-6">
                        <div className="bg-severity-success/5 border border-severity-success/20 px-3 py-2 rounded-lg text-xs font-bold text-brand-navy">
                          {row.x}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-brand-navy/5 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-text-muted font-bold">
                Example Synthetic Audit Findings Table v1.2
              </span>
              <Button size="sm" asChild>
                <Link to="/demo">
                  Run Sample Demo <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-brand-navy mb-16">
            Designed for teams that need proof.
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
            {[
              "Source citations",
              "Screenshot proof",
              "Version lineage",
              "Human-in-the-loop",
              "Remediation workflows",
              "Audit trails",
            ].map((title) => (
              <div key={title} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-surface-muted rounded-full flex items-center justify-center mb-6 text-brand-blue">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-brand-navy mb-2">
                  {title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-background">
        <div className="max-w-5xl mx-auto rounded-3xl bg-brand-navy p-12 lg:p-20 text-center relative overflow-hidden">
          <h2 className="text-5xl font-bold text-white mb-6 relative z-10 leading-tight">
            Start with a source drift audit.
          </h2>
          <p className="text-xl text-brand-blue font-medium mb-10 relative z-10 max-w-2xl mx-auto">
            Run a sample audit to see how SourceLink detects stale claims,
            outdated brand assets, and downstream update requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Button size="lg" asChild>
              <Link to="/demo">Run Sample Audit</Link>
            </Button>
            <Button size="lg" variant="outline">
              View Example Report
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-cyan/20 blur-[120px] rounded-full"></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
