import { Schema, model, Types, type HydratedDocument } from "mongoose";
import { PLAN_CATEGORIES, type PlanCategory } from "./plan.model";

export const SUBSCRIPTION_STATUSES = [
  "active",
  "expired",
  "cancelled",
] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

export const PAYMENT_METHODS = ["cash", "gcash", "bank"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export interface ISubscription {
  memberId: string; // Better Auth user id
  plan: Types.ObjectId;
  planSnapshot: {
    name: string;
    category: PlanCategory;
    pricePhp: number;
    durationDays: number;
    requiresStudentId: boolean;
  };
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD", inclusive
  status: SubscriptionStatus;
  payment: {
    amountPhp: number;
    method: PaymentMethod;
    reference?: string; // GCash ref no., receipt no.
    recordedBy: string; // admin's Better Auth user id
    paidAt: Date;
  };
  cancelledAt?: Date;
}
export type SubscriptionDocument = HydratedDocument<ISubscription> & {
  createdAt: Date;
  updatedAt: Date;
};

const subscriptionSchema = new Schema<ISubscription>(
  {
    memberId: { type: String, required: true },
    plan: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
    planSnapshot: {
      name: { type: String, required: true },
      category: { type: String, enum: PLAN_CATEGORIES, required: true },
      pricePhp: { type: Number, required: true, min: 0 },
      durationDays: { type: Number, required: true, min: 1 },
      requiresStudentId: { type: Boolean, required: true },
    },
    startDate: { type: String, required: true, match: DATE_REGEX },
    endDate: { type: String, required: true, match: DATE_REGEX },
    status: { type: String, enum: SUBSCRIPTION_STATUSES, default: "active" },
    payment: {
      amountPhp: { type: Number, required: true, min: 0 },
      method: { type: String, enum: PAYMENT_METHODS, required: true },
      reference: { type: String, trim: true },
      recordedBy: { type: String, required: true },
      paidAt: { type: Date, default: Date.now },
    },
    cancelledAt: { type: Date },
  },
  { timestamps: true },
);

// "YYYY-MM-DD" strings compare correctly as plain strings
subscriptionSchema.pre("validate", function () {
  if (this.startDate && this.endDate && this.endDate < this.startDate) {
    this.invalidate("endDate", "endDate cannot be before startDate");
  }
});

// "Does this member have an active subscription?" and "who's expiring soon?"
subscriptionSchema.index({ memberId: 1, status: 1, endDate: -1 });
subscriptionSchema.index({ status: 1, endDate: 1 });

export const Subscription = model<ISubscription>(
  "Subscription",
  subscriptionSchema,
);
