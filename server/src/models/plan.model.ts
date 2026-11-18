import { Schema, model, type HydratedDocument } from "mongoose";

export const PLAN_CATEGORIES = [
  "walk-in",
  "monthly",
  "quarterly",
  "annual",
] as const;
export type PlanCategory = (typeof PLAN_CATEGORIES)[number];

export interface IPlan {
  name: string;
  slug: string;
  category: PlanCategory;
  pricePhp: number;
  durationDays: number;
  description: string;
  perks: string[];
  requiresStudentId: boolean;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
}
export type PlanDocument = HydratedDocument<IPlan> & {
  createdAt: Date;
  updatedAt: Date;
};
const planSchema = new Schema<IPlan>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    category: { type: String, enum: PLAN_CATEGORIES, required: true },
    pricePhp: { type: Number, required: true, min: 0 },
    durationDays: { type: Number, required: true, min: 1 },
    description: { type: String, required: true, trim: true },
    perks: { type: [String], default: [] },
    requiresStudentId: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);
planSchema.index({ isActive: 1, sortOrder: 1 });

export const Plan = model<IPlan>("Plan", planSchema);
