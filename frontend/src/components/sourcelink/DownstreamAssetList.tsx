import type { DownstreamAsset } from "../../types/asset";
import { AssetCard } from "./AssetCard";

export function DownstreamAssetList({ assets }: { assets: DownstreamAsset[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {assets.map((asset) => (
        <div key={asset.id}>
          <AssetCard asset={asset} />
        </div>
      ))}
    </div>
  );
}
