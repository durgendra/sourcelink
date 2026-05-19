import { createApp } from "./app";
import { connectDb } from "./config/db";
import { env } from "./config/env";
import { logger } from "./config/logger";

const start = async () => {
  await connectDb();
  const app = createApp();
  app.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, "SourceLink backend listening");
  });
};

start().catch((error) => {
  logger.error({ err: error }, "Failed to start server");
  process.exit(1);
});
