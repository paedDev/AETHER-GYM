import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { env } from "./config/env";
import { logger } from "./lib/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { requireAuth, requireRole } from "./middlewares/requireAuth";
import { betterAuth } from "better-auth";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
    }),
  );
  app.use(pinoHttp({ logger }));

  app.all(
    "/api/auth/*splat",
    rateLimit({
      windowMs: 60_000,
      limit: 30,
    }),
    toNodeHandler(auth),
  );
  app.use(express.json());

  //   Test Routes
  app.get("/api/health", (_req, res) => res.json({ ok: true }));
  app.get("/api/me", requireAuth, (req, res) => res.json(req.session));

  app.get("/api/admin/ping", requireAuth, requireRole("admin"), (_req, res) =>
    res.json({ message: "hello admin" }),
  );

  app.use(errorHandler);
  return app;
}
