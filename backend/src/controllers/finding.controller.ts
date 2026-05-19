import type { Request, Response } from "express";
import { getFindingById, listFindings, patchFinding, updateFindingStatus } from "../services/finding.service";

export const listFindingsHandler = async (_req: Request, res: Response) => {
  res.json(await listFindings());
};

export const getFindingHandler = async (req: Request, res: Response) => {
  res.json(await getFindingById(req.params.findingId));
};

export const updateFindingStatusHandler = async (req: Request, res: Response) => {
  res.json(await updateFindingStatus(req.params.findingId, req.body.status));
};

export const patchFindingHandler = async (req: Request, res: Response) => {
  res.json(await patchFinding(req.params.findingId, req.body));
};
