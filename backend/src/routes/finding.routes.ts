import { Router } from "express";
import {
  getFindingHandler,
  listFindingsHandler,
  patchFindingHandler,
  updateFindingStatusHandler
} from "../controllers/finding.controller";
import { validateRequest } from "../middleware/validateRequest";
import { updateFindingSchema, updateFindingStatusSchema } from "../schemas/finding.schema";

export const findingRouter = Router();

findingRouter.get("/", listFindingsHandler);
findingRouter.get("/:findingId", getFindingHandler);
findingRouter.patch("/:findingId/status", validateRequest(updateFindingStatusSchema), updateFindingStatusHandler);
findingRouter.patch("/:findingId", validateRequest(updateFindingSchema), patchFindingHandler);
