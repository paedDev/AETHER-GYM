import { createApp } from "./app";
import { connectDb } from "./config/db";
import { env } from "./config/env";
import { logger } from "./lib/logger";

async function main() {
  await connectDb();
  createApp().listen(env.PORT, () =>
    logger.info(`Server is running on port ${env.PORT}`),
  );
}
main().catch((err) => {
  logger.fatal(err);
  process.exit(1);
});
