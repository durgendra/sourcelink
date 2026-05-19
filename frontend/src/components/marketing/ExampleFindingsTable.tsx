import { Card } from "../ui/Card";
import { SeverityBadge } from "../ui/SeverityBadge";

const rows = [
  ["“Official Apple Partner” unsupported", "Brand Audit", "High", "No verified partner-status source", "Replace or remove affiliation language"],
  ["“Available globally”", "Claim Audit", "High", "Source says U.S. and Canada", "Use approved regional wording"],
  ["Old logo detected", "Brand Audit", "Medium", "Brand Guidelines v2.0 shows new logo", "Replace with approved logo"],
  ["“5-year warranty”", "Claim Audit", "High", "Source says 3-year warranty", "Correct warranty language"],
  ["Feature applied to all models", "Claim Audit", "High", "Source says selected SKU only", "Qualify by SKU"]
];

export function ExampleFindingsTable() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-brand-navy">Example findings</h2>
      <Card className="mt-10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface-muted text-text-secondary">
              <tr>
                {["Finding", "Module", "Severity", "Evidence", "Suggested Fix"].map((header) => (
                  <th key={header} className="px-6 py-4 font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([finding, module, severity, evidence, fix]) => (
                <tr key={finding} className="border-t border-border">
                  <td className="px-6 py-4 font-medium text-brand-navy">{finding}</td>
                  <td className="px-6 py-4">{module}</td>
                  <td className="px-6 py-4"><SeverityBadge severity={severity as "High" | "Medium"} /></td>
                  <td className="px-6 py-4 text-text-secondary">{evidence}</td>
                  <td className="px-6 py-4 text-text-secondary">{fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
