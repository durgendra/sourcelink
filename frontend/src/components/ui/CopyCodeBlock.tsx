import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { copyToClipboard } from "../../utils/copy";
import { useDemoStore } from "../../store/useDemoStore";

export function CopyCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const pushToast = useDemoStore((state) => state.pushToast);

  const handleCopy = async () => {
    await copyToClipboard(code);
    setCopied(true);
    pushToast("Copied", "Snippet copied to clipboard.");
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="rounded-3xl border border-border bg-brand-navy p-4">
      <div className="mb-3 flex justify-end">
        <button className="rounded-lg bg-white/10 p-2 text-white transition hover:bg-white/20" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre className="overflow-x-auto text-xs leading-6 text-cyan-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}
