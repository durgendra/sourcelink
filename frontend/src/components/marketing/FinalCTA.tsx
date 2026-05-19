import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Card className="bg-brand-navy p-10 text-center text-white">
        <h2 className="text-4xl font-bold">Start with a source drift audit.</h2>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/demo">
            <Button fullWidth>Run Sample Demo</Button>
          </Link>
          <Link to="/app/reports">
            <Button variant="secondary" fullWidth>View Example Report</Button>
          </Link>
        </div>
      </Card>
    </section>
  );
}
