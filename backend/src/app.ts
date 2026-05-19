import "express-async-errors";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { authPlaceholder } from "./middleware/authPlaceholder";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { apiRateLimit } from "./middleware/rateLimit";
import { assetRouter } from "./routes/asset.routes";
import { demoRouter } from "./routes/demo.routes";
import { embedRouter } from "./routes/embed.routes";
import { findingRouter } from "./routes/finding.routes";
import { healthRouter } from "./routes/health.routes";
import { impactRouter } from "./routes/impact.routes";
import { reportRouter } from "./routes/report.routes";
import { sourceRouter } from "./routes/source.routes";
import { usageRouter } from "./routes/usage.routes";

export const createApp = () => {
  const app = express();

  app.use(
    pinoHttp({
      logger
    })
  );
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json({ limit: `${env.MAX_FILE_SIZE_MB}mb` }));
  app.use(apiRateLimit);
  app.use(authPlaceholder);

  app.use("/api/health", healthRouter);
  app.use("/api/sources", sourceRouter);
  app.use("/api/embeds", embedRouter);
  app.use("/api/assets", assetRouter);
  app.use("/api", usageRouter);
  app.use("/api", impactRouter);
  app.use("/api/findings", findingRouter);
  app.use("/api/reports", reportRouter);
  app.use("/api/demo", demoRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
