import type { Request, Response } from "express";
import path from "node:path";
import { generateReport, getReportById } from "../services/report/reportGenerator.service";

export const createReportHandler = async (req: Request, res: Response) => {
  const report = await generateReport(req.body.sourceUpdateEventId, req.body.format);
  res.status(201).json(report);
};

export const getReportHandler = async (req: Request, res: Response) => {
  res.json(await getReportById(req.params.reportId));
};

export const downloadReportHandler = async (req: Request, res: Response) => {
  const report = await getReportById(req.params.reportId);
  res.download(path.resolve(report.filePath ?? ""));
};
