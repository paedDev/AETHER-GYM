import type { RequestHandler } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth, type Session } from "../lib/auth";
import { AppError } from "./errorHandler";

declare global {
  namespace Express {
    interface Request {
      session?: Session;
    }
  }
}

export const requireAuth: RequestHandler = async (req, res, next) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) return next(new AppError(401, "Unauthorized", "UNAUTHORIZED"));
  req.session = session;
  next();
};

export const requireRole =
  (...roles: string[]): RequestHandler =>
  (req, _res, next) => {
    const role = (req.session?.user as { role?: string })?.role;
    if (!role || !roles.includes(role)) {
      return next(new AppError(403, "Forbidden", "FORBIDDEN"));
    }
    next();
  };
