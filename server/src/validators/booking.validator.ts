import { z } from "zod";
import { BOOKING_STATUSES } from "../models";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// Validates POST /api/classes/:id/book (or POST /api/bookings)
export const createBookingSchema = z.object({
  gymClassId: z.string().regex(OBJECT_ID_REGEX, "Invalid class ID"),
  sessionDate: z
    .string()
    .regex(DATE_REGEX, "sessionDate must be in YYYY-MM-DD format")
    .refine((val) => {
      const [y, m, d] = val.split("-").map(Number);
      const date = new Date(Date.UTC(y, m - 1, d));
      return (
        date.getUTCFullYear() === y &&
        date.getUTCMonth() === m - 1 &&
        date.getUTCDate() === d
      );
    }, "Invalid calendar date"),
});

// Validates GET /api/bookings/me?status=booked
export const listBookingsQuerySchema = z.object({
  status: z.enum(BOOKING_STATUSES).optional(),
});

// Validates :id param on PATCH /api/bookings/:id/cancel
export const bookingIdParamSchema = z.object({
  id: z.string().regex(OBJECT_ID_REGEX, "Invalid booking ID"),
});
