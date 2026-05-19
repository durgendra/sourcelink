import type { Request, Response } from "express";
import { generateEmbed, getEmbedMetadata } from "../services/embed.service";

export const generateEmbedHandler = async (req: Request, res: Response) => {
  const result = await generateEmbed(req.body.sourceObjectId, req.body.updateMode);
  res.status(201).json(result);
};

export const getEmbedHandler = async (req: Request, res: Response) => {
  res.json(await getEmbedMetadata(req.params.sourceObjectId));
};
