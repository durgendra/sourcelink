import { BarChart3, FileCheck2, Files, LayoutDashboard, Link2, Network, Settings, ShieldAlert, Users } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

const items = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/create", label: "Create SourceLink", icon: Link2 },
  { to: "/app/sources", label: "Source Registry", icon: Files },
  { to: "/app/impact", label: "Impact Graph", icon: Network },
  { to: "/app/audits/audit-apple-style", label: "Audits", icon: ShieldAlert },
  { to: "/app/findings", label: "Findings", icon: FileCheck2 },
  { to: "/app/settings", label: "Partners", icon: Users },
  { to: "/app/reports", label: "Reports", icon: BarChart3 },
  { to: "/app/settings", label: "Settings", icon: Settings }
];

export function Sidebar({ mobile = false }: { mobile?: boolean }) {
  return (
    <aside className={cn("w-72 shrink-0 border-r border-border bg-white", mobile ? "block border-r-0" : "hidden xl:block")}>
      <div className="p-6">
        <Link to="/" className="block rounded-2xl outline-none transition hover:opacity-85 focus-visible:ring-4 focus-visible:ring-blue-100">
          <p className="text-[2.1rem] leading-none font-bold tracking-tight text-brand-navy">SourceLink</p>
          <p className="mt-3 text-[0.95rem] leading-8 text-text-secondary">Dependency management for digital content.</p>
        </Link>
      </div>
      <nav className="space-y-3 px-4 pb-6">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to + item.label}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-4 rounded-3xl px-5 py-4 text-[0.97rem] font-medium transition",
                  isActive ? "bg-brand-navy text-white shadow-sm" : "text-text-secondary hover:bg-surface-muted hover:text-brand-navy"
                )
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
