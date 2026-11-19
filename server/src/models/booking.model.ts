import { Schema, model, Types, type HydratedDocument } from "mongoose";

export const BOOKING_STATUSES = ["booked", "cancelled"] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
export interface IBooking {
  memberId: string;
  gymClassId: Types.ObjectId;
  sessionDate: string;
  status: BookingStatus;
  cancelledAt?: Date;
}

export type BookingDocument = HydratedDocument<IBooking> & {
  createdAt: Date;
  updatedAt: Date;
};

const bookingSchema = new Schema<IBooking>(
  {
    memberId: {
      type: String,
      required: true,
    },
    gymClassId: {
      type: Schema.Types.ObjectId,
      ref: "GymClass",
      required: true,
    },
    sessionDate: {
      type: String,
      required: true,
      match: DATE_REGEX,
    },
    status: { type: String, enum: BOOKING_STATUSES, default: "booked" },
    cancelledAt: { type: Date },
  },
  { timestamps: true },
);
// One ACTIVE booking per member per class occurrence.
// Partial index so a cancelled booking doesn't block re-booking.
bookingSchema.index(
  { memberId: 1, gymClass: 1, sessionDate: 1 },
  { unique: true, partialFilterExpression: { status: "booked" } },
);
// Capacity check: count booked for (class, date)
bookingSchema.index({ gymClassId: 1, sessionDate: 1, status: 1 });
// "My bookings" page
bookingSchema.index({ memberId: 1, sessionDate: -1 });
export const Booking = model<IBooking>("Booking", bookingSchema);
