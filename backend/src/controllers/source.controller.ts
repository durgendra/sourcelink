import type { Request, Response } from "express";
import { appendSourceVersion, createSource, getSourceById, listSources, listSourceVersions, updateSourceAndCreateEvent } from "../services/source.service";

export const createSourceHandler = async (req: Request, res: Response) => {
  const result = await createSource(req.body);
  res.status(201).json(result);
};

export const listSourcesHandler = async (_req: Request, res: Response) => {
  const result = await listSources();
  res.json(result);
};

export const getSourceHandler = async (req: Request, res: Response) => {
  const result = await getSourceById(req.params.sourceObjectId);
  res.json(result);
};

export const createSourceVersionHandler = async (req: Request, res: Response) => {
  const result = await appendSourceVersion(req.params.sourceObjectId, req.body);
  res.status(201).json(result);
};

export const listSourceVersionsHandler = async (req: Request, res: Response) => {
  const result = await listSourceVersions(req.params.sourceObjectId);
  res.json(result);
};

export const updateSourceHandler = async (req: Request, res: Response) => {
  const result = await updateSourceAndCreateEvent(req.params.sourceObjectId, req.body);
  res.status(201).json(result);
};
