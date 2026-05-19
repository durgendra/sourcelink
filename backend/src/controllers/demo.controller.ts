import type { Request, Response } from "express";
import { buildAppleStyleDashboard, runAppleStyleSourceUpdate, seedAppleStyleDemo } from "../services/demo/demoSeed.service";
import { runImpactAnalysis } from "../services/lineage/impactEngine.service";

export const seedDemoHandler = async (_req: Request, res: Response) => {
  const scenario = await seedAppleStyleDemo();
  res.status(201).json(scenario);
};

export const createAppleStyleDemoHandler = async (_req: Request, res: Response) => {
  const scenario = await seedAppleStyleDemo();
  res.status(201).json(scenario);
};

export const runAppleStyleSourceUpdateHandler = async (_req: Request, res: Response) => {
  const update = await runAppleStyleSourceUpdate();
  const impact = await runImpactAnalysis(update.eventId);
  res.status(201).json({ update, impact });
};

export const getAppleStyleDashboardHandler = async (_req: Request, res: Response) => {
  res.json(await buildAppleStyleDashboard());
};
