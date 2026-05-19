import { Badge } from "./Badge";
import type { Severity } from "../../types/finding";
import { severityClasses } from "../../utils/severity";

export function SeverityBadge({ severity }: { severity: Severity }) {
  return <Badge className={severityClasses[severity]}>{severity}</Badge>;
}
