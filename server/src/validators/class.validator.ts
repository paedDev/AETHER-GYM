import { z } from "zod";
import { CLASS_CATEGORIES, DAYS_OF_WEEK } from "../models";

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const baseClassSchema = z.object({
  title: z.string().trim().min(2, "Class title is required").max(100),
  description: z.string().trim().max(500).optional().default(""),
  trainerName: z.string().trim().min(2, "Trainer name is required").max(80),
  category: z.enum(CLASS_CATEGORIES).default("strength"),
  dayOfWeek: z.enum(DAYS_OF_WEEK),
  startTime: z.string().regex(TIME_REGEX, "startTime must be HH:mm (24-hour)"),
  endTime: z.string().regex(TIME_REGEX, "endTime must be HH:mm (24-hour)"),
  maxCapacity: z.number().int().min(1).max(100).default(15),
  isActive: z.boolean().default(true),
});

export const createClassSchema = baseClassSchema.refine(
  (data) => data.endTime > data.startTime,
  { message: "endTime must be after startTime", path: ["endTime"] },
);

export const updateClassSchema = baseClassSchema
  .partial()
  .refine(
    (data) => !data.startTime || !data.endTime || data.endTime > data.startTime,
    { message: "endTime must be after startTime", path: ["endTime"] },
  );

export const bookClassSchema = z.object({
  sessionDate: z.string().regex(DATE_REGEX, "sessionDate must be YYYY-MM-DD"),
});
