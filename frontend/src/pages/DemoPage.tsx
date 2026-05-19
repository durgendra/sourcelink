import { Link } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { PublicNavbar } from "../components/layout/PublicNavbar";
import { ImpactGraph } from "../components/sourcelink/ImpactGraph";
import { ReportPreview } from "../components/sourcelink/ReportPreview";
import { SourceUpdateAlert } from "../components/sourcelink/SourceUpdateAlert";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useDemoStore } from "../store/useDemoStore";

export function DemoPage() {
  const audit = useDemoStore((state) => state.audit);
  if (!audit) return null;

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <section className="pt-28 pb-20 px-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-brand-navy">Public SourceLink demo</h1>
            <p className="mt-4 text-lg text-text-secondary">Create SourceLink → partner page uses content → source changes → impact found → suggested fix generated.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/app/dashboard"><Button fullWidth>Open Dashboard</Button></Link>
              <Link to="/app/audits/audit-apple-style"><Button variant="secondary" fullWidth>Open Audit Detail</Button></Link>
            </div>
          </div>
          <div className="mt-10 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <SourceUpdateAlert sourceUpdate={audit.sourceUpdate} />
            <ImpactGraph graph={audit.impactGraph} />
          </div>
          <div className="mt-8">
            <ReportPreview report={audit.report} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
