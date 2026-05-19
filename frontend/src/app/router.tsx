import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { Card } from "../components/ui/Card";

const HomePage = lazy(() => import("../pages/HomePage").then((module) => ({ default: module.HomePage })));
const DemoPage = lazy(() => import("../pages/DemoPage").then((module) => ({ default: module.DemoPage })));
const DashboardPage = lazy(() => import("../pages/DashboardPage").then((module) => ({ default: module.DashboardPage })));
const CreateSourceLinkPage = lazy(() => import("../pages/CreateSourceLinkPage").then((module) => ({ default: module.CreateSourceLinkPage })));
const AuditDetailPage = lazy(() => import("../pages/AuditDetailPage").then((module) => ({ default: module.AuditDetailPage })));
const SourceRegistryPage = lazy(() => import("../pages/SourceRegistryPage").then((module) => ({ default: module.SourceRegistryPage })));
const ImpactGraphPage = lazy(() => import("../pages/ImpactGraphPage").then((module) => ({ default: module.ImpactGraphPage })));
const FindingsPage = lazy(() => import("../pages/FindingsPage").then((module) => ({ default: module.FindingsPage })));
const ReportsPage = lazy(() => import("../pages/ReportsPage").then((module) => ({ default: module.ReportsPage })));
const SettingsPage = lazy(() => import("../pages/SettingsPage").then((module) => ({ default: module.SettingsPage })));

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 text-center">
        <p className="text-lg font-semibold text-brand-navy">Loading SourceLink workspace…</p>
        <p className="mt-2 text-sm text-text-secondary">Preparing the next view and its audit data.</p>
      </Card>
    </div>
  );
}

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  { path: "/", element: withSuspense(<HomePage />) },
  { path: "/demo", element: withSuspense(<DemoPage />) },
  {
    path: "/app",
    element: <AppShell />,
    children: [
      { path: "dashboard", element: withSuspense(<DashboardPage />) },
      { path: "create", element: withSuspense(<CreateSourceLinkPage />) },
      { path: "audits/:auditId", element: withSuspense(<AuditDetailPage />) },
      { path: "sources", element: withSuspense(<SourceRegistryPage />) },
      { path: "impact", element: withSuspense(<ImpactGraphPage />) },
      { path: "findings", element: withSuspense(<FindingsPage />) },
      { path: "reports", element: withSuspense(<ReportsPage />) },
      { path: "settings", element: withSuspense(<SettingsPage />) }
    ]
  }
]);
