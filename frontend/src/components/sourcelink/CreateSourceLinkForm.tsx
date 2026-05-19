import { ArrowRight, Link2, Plus, WandSparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { useDemoStore } from "../../store/useDemoStore";

const sourceTypes = ["Claim", "Logo", "Disclaimer", "Document", "Brand Rule", "Product Spec", "Warranty", "Certification"];
const updateModes = ["Auto-update", "Review-required", "Alert-only"];

export function CreateSourceLinkForm() {
  const navigate = useNavigate();
  const {
    createForm,
    customDemoForm,
    updateCreateForm,
    updateCustomDemoForm,
    createSourceLink,
    runCustomDemo,
    loading
  } = useDemoStore();

  const fields = [
    ["Source object name", "name", "Partner Relationship Language"],
    ["Version", "version", "1.0"],
    ["Scope", "scope", "Partner relationship language"],
    ["Owner", "owner", "Brand Team"],
    ["Canonical URL", "canonicalUrl", "https://sourcelink.ai/r/sl:demo:apple-style:partner-status"]
  ] as const;

  const handleRunCustomDemo = async () => {
    try {
      await runCustomDemo();
      navigate("/app/audits/audit-custom-demo");
    } catch {
      return;
    }
  };

  return (
    <Card className="w-full p-8 xl:p-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Create SourceLink</h1>
          <p className="mt-2 text-sm text-text-secondary">Define a source-linked content object for embedding.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Save Object
        </Button>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <label className="space-y-2 xl:col-span-2">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Source object name</span>
          <Input value={createForm.name} onChange={(event) => updateCreateForm("name", event.target.value)} placeholder="Partner Relationship Language" />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Source type</span>
          <Select value={createForm.objectType} onChange={(event) => updateCreateForm("objectType", event.target.value)}>
            {sourceTypes.map((type) => <option key={type}>{type}</option>)}
          </Select>
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Update mode</span>
          <Select value={createForm.updateMode} onChange={(event) => updateCreateForm("updateMode", event.target.value)}>
            {updateModes.map((mode) => <option key={mode}>{mode}</option>)}
          </Select>
        </label>
        {fields.slice(1).map(([label, key, placeholder]) => (
          <label key={key} className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">{label}</span>
            <Input value={createForm[key]} onChange={(event) => updateCreateForm(key, event.target.value)} placeholder={placeholder} />
          </label>
        ))}
        <label className="space-y-2 xl:col-span-2">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Source text / Payload</span>
          <Textarea rows={5} value={createForm.sourceText} onChange={(event) => updateCreateForm("sourceText", event.target.value)} />
        </label>
      </div>

      <div className="mt-10 pt-8 border-t border-border space-y-6">
        <div>
          <h2 className="text-lg font-bold text-brand-navy">Run Custom Demo Workflow</h2>
          <p className="mt-2 text-sm text-text-secondary">Define the partner or reseller content that uses the source, then define the changed source language that should trigger audit and risk analysis.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Partner asset name</span>
            <Input value={customDemoForm.assetName} onChange={(event) => updateCustomDemoForm("assetName", event.target.value)} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Partner / Reseller</span>
            <Input value={customDemoForm.partnerName} onChange={(event) => updateCustomDemoForm("partnerName", event.target.value)} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Asset type</span>
            <Select value={customDemoForm.assetType} onChange={(event) => updateCustomDemoForm("assetType", event.target.value)}>
              <option value="webpage">Webpage</option>
              <option value="marketplace_listing">Marketplace Listing</option>
              <option value="document">Document</option>
            </Select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Partner asset URL</span>
            <Input value={customDemoForm.assetUrl} onChange={(event) => updateCustomDemoForm("assetUrl", event.target.value)} />
          </label>
          <label className="space-y-2 xl:col-span-2">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Partner content using the source</span>
            <Textarea rows={5} value={customDemoForm.assetText} onChange={(event) => updateCustomDemoForm("assetText", event.target.value)} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Updated source version</span>
            <Input value={customDemoForm.updatedVersion} onChange={(event) => updateCustomDemoForm("updatedVersion", event.target.value)} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Change summary</span>
            <Input value={customDemoForm.changeSummary} onChange={(event) => updateCustomDemoForm("changeSummary", event.target.value)} />
          </label>
          <label className="space-y-2 xl:col-span-2">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Updated source text that triggers the workflow</span>
            <Textarea rows={5} value={customDemoForm.updatedSourceText} onChange={(event) => updateCustomDemoForm("updatedSourceText", event.target.value)} />
          </label>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button disabled={loading} onClick={() => void createSourceLink()}>
          <Link2 className="h-4 w-4" />
          Generate Embed
        </Button>
        <Button
          disabled={loading}
          onClick={() => void handleRunCustomDemo()}
        >
          <WandSparkles className="h-4 w-4" />
          Run Full Demo
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
