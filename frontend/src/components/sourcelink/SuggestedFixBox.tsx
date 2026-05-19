import { Copy } from "lucide-react";
import type { Finding } from "../../types/finding";
import { useDemoStore } from "../../store/useDemoStore";
import { copyToClipboard } from "../../utils/copy";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export function SuggestedFixBox({ finding }: { finding: Finding }) {
  const pushToast = useDemoStore((state) => state.pushToast);

  return (
    <Card className="p-8">
      <h3 className="text-lg font-bold text-brand-navy">Suggested Updates</h3>
      <div className="mt-4 rounded-2xl bg-severity-success/5 border border-severity-success/20 p-4">
        <p className="text-sm text-text-primary">{finding.suggestedFix}</p>
      </div>
      <div className="mt-5">
        <Button variant="secondary" onClick={() => void copyToClipboard(finding.suggestedFix).then(() => pushToast("Fix copied", "Suggested fix copied to clipboard."))}>
          <Copy className="h-4 w-4" />
          Copy fix
        </Button>
      </div>
    </Card>
  );
}
