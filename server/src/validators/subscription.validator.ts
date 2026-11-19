import { z } from "zod";
import { PAYMENT_METHODS } from "../models";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const createSubscriptionSchema = z.object({
  memberId: z.string().min(1, "memberId is required"),
  planId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid planId"),
  startDate: z.string().regex(DATE_REGEX, "startDate must be YYYY-MM-DD"),
  payment: z.object({
    amountPhp: z.number().nonnegative(),
    method: z.enum(PAYMENT_METHODS),
    reference: z.string().trim().optional(),
  }),
});
