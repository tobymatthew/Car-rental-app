import {
  BookingRepositoryError,
  type Booking,
  type BookingRepository,
  type NewMockBooking,
} from "./bookingRepository";
import { asyncStorageAdapter, type StorageAdapter } from "@/data/storage/storageAdapter";
import { validateBookingDraft } from "../domain/bookingDraft";
import { calculateQuote } from "../domain/calculateQuote";

export type MockBookingRepositoryScenario = "normal" | "delayed" | "error" | "fail-once";
type Options = {
  scenario?: MockBookingRepositoryScenario;
  delayMs?: number;
  now?: () => string;
  storage?: StorageAdapter;
  storageKey?: string;
};

type PersistedBookingStore = { bookings: readonly Booking[]; sequence: number };
export interface MockBookingRepository extends BookingRepository {
  /** Development/test support only. Never expose this as a customer action. */
  resetMockBookings(): Promise<void>;
}

const copy = (booking: Booking): Booking => ({
  ...booking,
  draft: { ...booking.draft },
  quote: { ...booking.quote },
});

export function createMockBookingRepository({
  scenario = "normal",
  delayMs = scenario === "delayed" ? 150 : 0,
  now = () => new Date().toISOString(),
  storage = asyncStorageAdapter,
  storageKey = "cargenie.mock.bookings.v1",
}: Options = {}): MockBookingRepository {
  const bookings = new Map<string, Booking>();
  const confirmationKeys = new Map<string, string>();
  let shouldFail = scenario === "fail-once";
  let sequence = 1;
  let loadPromise: Promise<void> | undefined;
  let writeQueue = Promise.resolve();
  const load = () => {
    loadPromise ??= (async () => {
      try {
        const value = await storage.getItem(storageKey);
        if (!value) return;
        const persisted = JSON.parse(value) as PersistedBookingStore;
        if (!Array.isArray(persisted.bookings) || !Number.isInteger(persisted.sequence)) return;
        persisted.bookings.forEach((booking) => {
          bookings.set(booking.id, copy(booking));
          confirmationKeys.set(booking.draft.confirmationKey, booking.id);
        });
        sequence = Math.max(1, persisted.sequence);
      } catch {
        // Corrupt mock storage is treated as an empty store; no sensitive data is involved.
      }
    })();
    return loadPromise;
  };
  const persist = (nextBookings: readonly Booking[], nextSequence: number) =>
    storage.setItem(
      storageKey,
      JSON.stringify({
        bookings: nextBookings,
        sequence: nextSequence,
      } satisfies PersistedBookingStore),
    );
  const wait = () =>
    delayMs ? new Promise<void>((resolve) => setTimeout(resolve, delayMs)) : Promise.resolve();
  const fail = () => scenario === "error" || shouldFail;
  const check = async () => {
    await wait();
    if (fail()) {
      shouldFail = false;
      throw new BookingRepositoryError();
    }
    await load();
  };
  return {
    async createMockBooking({ draft, quote }: NewMockBooking) {
      await check();
      const errors = validateBookingDraft(draft);
      if (Object.keys(errors).length || !draft.confirmationKey.trim()) {
        throw new BookingRepositoryError("The mock booking draft is incomplete or invalid.");
      }
      let expectedQuote;
      try {
        expectedQuote = calculateQuote(draft, {
          dailyRateNgn: quote.dailyRate,
          currency: quote.currency,
        });
      } catch {
        throw new BookingRepositoryError("The mock booking quote is invalid.");
      }
      if (JSON.stringify(expectedQuote) !== JSON.stringify(quote)) {
        throw new BookingRepositoryError("The mock booking quote does not match the draft.");
      }
      const operation = writeQueue.then(async () => {
        const existingId = confirmationKeys.get(draft.confirmationKey);
        if (existingId) return copy(bookings.get(existingId)!);
        const booking: Booking = {
          id: `mock-booking-${sequence}`,
          draft: { ...draft },
          quote: { ...quote },
          status: "confirmed",
          createdAt: now(),
        };
        const nextSequence = sequence + 1;
        await persist([...bookings.values(), booking], nextSequence);
        bookings.set(booking.id, booking);
        confirmationKeys.set(draft.confirmationKey, booking.id);
        sequence = nextSequence;
        return copy(booking);
      });
      writeQueue = operation.then(
        () => undefined,
        () => undefined,
      );
      return operation;
    },
    async listBookings() {
      await check();
      return [...bookings.values()]
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map(copy);
    },
    async getBooking(id) {
      await check();
      const booking = bookings.get(id);
      return booking ? copy(booking) : null;
    },
    /** Development/test support only. Never expose this as a customer action. */
    async resetMockBookings() {
      await check();
      const operation = writeQueue.then(async () => {
        await storage.removeItem(storageKey);
        bookings.clear();
        confirmationKeys.clear();
        sequence = 1;
      });
      writeQueue = operation.then(
        () => undefined,
        () => undefined,
      );
      return operation;
    },
  };
}

export const bookingRepository = createMockBookingRepository();
