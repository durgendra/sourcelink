import pino from "pino";
import { env } from "./env";

export const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  transport:
    env.NODE_ENV === "production"
      ? undefined
      : {
          target: "pino-pretty",
          options: {
            colorize: true
          }
        },
  redact:
    env.NODE_ENV === "production"
      ? ["req.headers.authorization", "req.body.rawText", "req.body.sourceText"]
      : []
});
