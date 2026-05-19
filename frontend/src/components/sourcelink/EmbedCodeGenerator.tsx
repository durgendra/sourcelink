import { Check, Code, Copy, Settings } from "lucide-react";
import { useState } from "react";
import { useDemoStore } from "../../store/useDemoStore";
import { Card } from "../ui/Card";
import { Tabs } from "../ui/Tabs";
import { copyToClipboard } from "../../utils/copy";
import { useDemoStore as useToastStore } from "../../store/useDemoStore";

export function EmbedCodeGenerator() {
  const embed = useDemoStore((state) => state.embed);
  const pushToast = useToastStore((state) => state.pushToast);
  const [activeTab, setActiveTab] = useState("Inline HTML");
  const [copied, setCopied] = useState<string | null>(null);
  const map = {
    "Inline HTML": embed.inlineHtml,
    "JSON-LD": embed.jsonLd,
    "Badge Widget": embed.badgeWidget
  } as const;

  const handleCopy = async (key: string) => {
    await copyToClipboard(map[key as keyof typeof map]);
    setCopied(key);
    pushToast("Copied", "Snippet copied to clipboard.");
    window.setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border-brand-blue/20 bg-brand-blue/5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-brand-navy flex items-center gap-2">
            <Code className="w-4 h-4 text-brand-blue" />
            Embed code generator
          </h3>
          <Tabs items={Object.keys(map)} active={activeTab} onChange={setActiveTab} />
        </div>
        <p className="mb-4 text-xs text-text-secondary leading-relaxed">Copy-paste SourceLink references directly into downstream content.</p>
        <div className="bg-brand-navy p-4 rounded-xl">
          <code className="text-[10px] text-brand-cyan leading-relaxed block break-all font-mono whitespace-pre-wrap">
            {map[activeTab as keyof typeof map]}
          </code>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => void handleCopy(activeTab)}
            className="p-1.5 hover:bg-brand-blue/10 rounded-lg transition-colors text-brand-blue"
          >
            {copied === activeTab ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </Card>

      <Card className="p-6 border-brand-violet/20 bg-brand-violet/5 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-4 h-4 text-brand-violet" />
          <h3 className="text-sm font-bold text-brand-navy">SourceLink note</h3>
        </div>
        <p className="text-[10px] text-text-secondary leading-relaxed">
          SourceLink references are cryptographically signed versions of your content objects. Once embedded, they can trigger automated remediation workflows across your entire channel.
        </p>
      </Card>
    </div>
  );
}
