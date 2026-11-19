import { z } from "zod";
import { PLAN_CATEGORIES } from "../models";

export const createPlanSchema = z.object({
  name: z.string().trim().min(2, "Plan name is required").max(80),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(80)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain lowercase letters, numbers, and hyphens only",
    ),
  category: z.enum(PLAN_CATEGORIES),
  pricePhp: z.number().nonnegative("Price cannot be negative"),
  durationDays: z.number().int().min(1, "Duration must be at least 1 day"),
  description: z.string().trim().min(5, "Description is required").max(500),
  perks: z.array(z.string().trim().min(1)).default([]),
  requiresStudentId: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const updatePlanSchema = createPlanSchema.partial();
