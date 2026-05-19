import { Router } from "express";
import { getImpactGraphHandler, getImpactHandler, runImpactHandler } from "../controllers/impact.controller";

export const impactRouter = Router();

impactRouter.post("/source-events/:eventId/run-impact", runImpactHandler);
impactRouter.get("/source-events/:eventId/impact", getImpactHandler);
impactRouter.get("/impact/graph", getImpactGraphHandler);
