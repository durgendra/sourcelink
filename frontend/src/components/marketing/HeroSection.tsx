import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroDashboardMockup } from "./HeroDashboardMockup";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function HeroSection() {
  return (
    <section className="hero-gradient pt-32 pb-20">
      <div className="hero-grid mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
        <Badge>AI governance for source-linked content</Badge>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-brand-navy sm:text-6xl">
          Keep third-party content synced with the source of truth.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-text-secondary">
          SourceLink maps partner claims, brand assets, documents, and listings back to approved sources, detects stale downstream usage, and generates evidence-backed update workflows.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/demo">
            <Button fullWidth>
              Run Sample Demo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/app/reports">
            <Button variant="secondary" fullWidth>
              View Example Report
            </Button>
          </Link>
        </div>
      </motion.div>
      <HeroDashboardMockup />
      </div>
    </section>
  );
}
