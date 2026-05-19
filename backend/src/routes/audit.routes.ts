import { Router } from "express";
import { getImpactGraphHandler, getImpactHandler, runImpactHandler } from "../controllers/audit.controller";

export const auditRouter = Router();

auditRouter.post("/source-events/:eventId/run-impact", runImpactHandler);
auditRouter.get("/source-events/:eventId/impact", getImpactHandler);
auditRouter.get("/impact/graph", getImpactGraphHandler);
