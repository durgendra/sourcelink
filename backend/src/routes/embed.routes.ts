import { Router } from "express";
import { generateEmbedHandler, getEmbedHandler } from "../controllers/embed.controller";
import { validateRequest } from "../middleware/validateRequest";
import { generateEmbedSchema } from "../schemas/embed.schema";

export const embedRouter = Router();

embedRouter.post("/generate", validateRequest(generateEmbedSchema), generateEmbedHandler);
embedRouter.get("/:sourceObjectId", getEmbedHandler);
