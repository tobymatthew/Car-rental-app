import type { ConfirmedBookingDraft } from "../domain/bookingDraft";
import type { BookingQuote } from "../domain/calculateQuote";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type Booking = {
  id: string;
  draft: ConfirmedBookingDraft;
  quote: BookingQuote;
  status: BookingStatus;
  createdAt: string;
};

export type NewMockBooking = { draft: ConfirmedBookingDraft; quote: BookingQuote };

export interface BookingRepository {
  createMockBooking(input: NewMockBooking): Promise<Booking>;
  listBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | null>;
}

export class BookingRepositoryError extends Error {
  constructor(message = "We couldn't update mock bookings. Please try again.") {
    super(message);
    this.name = "BookingRepositoryError";
  }
}
