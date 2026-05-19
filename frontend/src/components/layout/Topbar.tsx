import { Bell, Menu, Search, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export function Topbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button className="rounded-xl border border-border p-2 xl:hidden" onClick={onOpenSidebar}>
          <Menu className="h-4 w-4" />
        </button>
        <div className="relative hidden min-w-[420px] sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input placeholder="Search sources, assets, findings" className="pl-9 bg-surface-muted" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-xl border border-border p-2 text-text-secondary">
          <Bell className="h-4 w-4" />
        </button>
        <Button className="shadow-lg shadow-brand-blue/20">
          <Sparkles className="h-4 w-4" />
          Run Audit
        </Button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">SL</div>
      </div>
    </div>
  );
}
