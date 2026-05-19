import type { Request, Response } from "express";
import { getImpactByEvent, getImpactGraph, runImpactAnalysis } from "../services/lineage/impactEngine.service";

export const runImpactHandler = async (req: Request, res: Response) => {
  res.status(201).json(await runImpactAnalysis(req.params.eventId));
};

export const getImpactHandler = async (req: Request, res: Response) => {
  res.json(await getImpactByEvent(req.params.eventId));
};

export const getImpactGraphHandler = async (_req: Request, res: Response) => {
  res.json(await getImpactGraph());
};
