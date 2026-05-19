import { Router } from "express";
import {
  createAppleStyleDemoHandler,
  getAppleStyleDashboardHandler,
  runAppleStyleSourceUpdateHandler,
  seedDemoHandler
} from "../controllers/demo.controller";

export const demoRouter = Router();

demoRouter.post("/seed", seedDemoHandler);
demoRouter.post("/apple-style/create", createAppleStyleDemoHandler);
demoRouter.post("/apple-style/run-source-update", runAppleStyleSourceUpdateHandler);
demoRouter.get("/apple-style/dashboard", getAppleStyleDashboardHandler);
