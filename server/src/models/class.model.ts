import { Schema, model, type HydratedDocument } from "mongoose";

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];

export const CLASS_CATEGORIES = [
  "strength",
  "hiit",
  "boxing",
  "conditioning",
  "personal-training",
] as const;
export type ClassCategory = (typeof CLASS_CATEGORIES)[number];

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export interface IGymClass {
  title: string;
  description: string;
  trainerName: string;
  category: ClassCategory;
  dayOfWeek: DayOfWeek;
  startTime: string; // "HH:mm"
  endTime: string;
  maxCapacity: number;
  isActive: boolean;
}
export type GymClassDocument = HydratedDocument<IGymClass> & {
  createdAt: Date;
  updatedAt: Date;
};

const gymClassSchema = new Schema<IGymClass>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    trainerName: { type: String, required: true, trim: true },
    category: { type: String, enum: CLASS_CATEGORIES, default: "strength" },
    dayOfWeek: { type: String, enum: DAYS_OF_WEEK, required: true },
    startTime: { type: String, required: true, match: TIME_REGEX },
    endTime: { type: String, required: true, match: TIME_REGEX },
    maxCapacity: { type: Number, required: true, min: 1, default: 15 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// "HH:mm" strings compare correctly as plain strings
gymClassSchema.pre("validate", function () {
  if (this.startTime && this.endTime && this.endTime <= this.startTime) {
    this.invalidate("endTime", "endTime must be after startTime");
  }
});

gymClassSchema.index({ isActive: 1, dayOfWeek: 1, startTime: 1 });

export const GymClass = model<IGymClass>("GymClass", gymClassSchema);
