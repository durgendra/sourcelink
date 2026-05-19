import { ReportPreview } from "../components/sourcelink/ReportPreview";
import { useDemoStore } from "../store/useDemoStore";

export function ReportsPage() {
  const report = useDemoStore((state) => state.report);
  if (!report) return null;
  return <ReportPreview report={report} />;
}
