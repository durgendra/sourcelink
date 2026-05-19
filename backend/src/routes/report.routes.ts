import { Router } from "express";
import { createReportHandler, downloadReportHandler, getReportHandler } from "../controllers/report.controller";
import { validateRequest } from "../middleware/validateRequest";
import { createReportSchema } from "../schemas/report.schema";

export const reportRouter = Router();

reportRouter.post("/", validateRequest(createReportSchema), createReportHandler);
reportRouter.get("/:reportId", getReportHandler);
reportRouter.get("/:reportId/download", downloadReportHandler);
