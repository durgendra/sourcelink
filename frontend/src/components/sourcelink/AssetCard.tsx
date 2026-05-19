import type { DownstreamAsset } from "../../types/asset";
import { SeverityBadge } from "../ui/SeverityBadge";
import { Card } from "../ui/Card";

export function AssetCard({ asset }: { asset: DownstreamAsset }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-brand-navy">{asset.assetName}</h3>
          <p className="mt-1 text-sm text-text-secondary">{asset.assetType} • {asset.partnerName}</p>
        </div>
        <SeverityBadge severity={asset.risk} />
      </div>
      <p className="mt-4 text-sm leading-7 text-text-secondary">{asset.excerpt}</p>
    </Card>
  );
}
