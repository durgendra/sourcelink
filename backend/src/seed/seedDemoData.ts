import { connectDb, disconnectDb } from "../config/db";
import { logger } from "../config/logger";
import { seedAppleStyleDemo } from "../services/demo/demoSeed.service";

const seed = async () => {
  await connectDb();
  const scenario = await seedAppleStyleDemo();
  logger.info({ scenarioId: scenario._id.toString() }, "Demo seed complete");
  await disconnectDb();
};

seed().catch(async (error) => {
  logger.error({ err: error }, "Demo seed failed");
  await disconnectDb();
  process.exit(1);
});
