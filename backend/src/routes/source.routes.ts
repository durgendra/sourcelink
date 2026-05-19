import { Router } from "express";
import {
  createSourceHandler,
  createSourceVersionHandler,
  getSourceHandler,
  listSourceVersionsHandler,
  listSourcesHandler,
  updateSourceHandler
} from "../controllers/source.controller";
import { validateRequest } from "../middleware/validateRequest";
import { createSourceSchema, createSourceVersionSchema, updateSourceSchema } from "../schemas/source.schema";

export const sourceRouter = Router();

sourceRouter.post("/", validateRequest(createSourceSchema), createSourceHandler);
sourceRouter.get("/", listSourcesHandler);
sourceRouter.get("/:sourceObjectId", getSourceHandler);
sourceRouter.post("/:sourceObjectId/versions", validateRequest(createSourceVersionSchema), createSourceVersionHandler);
sourceRouter.get("/:sourceObjectId/versions", listSourceVersionsHandler);
sourceRouter.post("/:sourceObjectId/update", validateRequest(updateSourceSchema), updateSourceHandler);
