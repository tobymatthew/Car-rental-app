import { createMockBookingRepository } from "../repositories/mockBookingRepository";
import { BookingRepositoryError } from "../repositories/bookingRepository";
import { createMemoryStorageAdapter } from "@/data/storage/storageAdapter";
const input = {
  draft: {
    vehicleId: "vehicle-001",
    startDate: "2026-08-14",
    endDate: "2026-08-16",
    pickupTime: "08:00",
    dropOffTime: "16:00",
    pickupLocation: "Lekki",
    dropOffLocation: "Lekki",
    eligibilityAcknowledged: true,
    confirmationKey: "same",
  },
  quote: {
    rentalDays: 2,
    dailyRate: 42_000,
    rentalSubtotal: 84_000,
    serviceFee: 8_400,
    deliveryOrLocationFee: 0,
    discounts: 0,
    total: 92_400,
    currency: "NGN" as const,
  },
};
describe("mock booking repository", () => {
  it("is idempotent for rapid repeated confirmation and returns defensive data", async () => {
    const repository = createMockBookingRepository({
      now: () => "2026-01-01T00:00:00.000Z",
      storage: createMemoryStorageAdapter(),
    });
    const [first, second] = await Promise.all([
      repository.createMockBooking(input),
      repository.createMockBooking(input),
    ]);
    expect(first.id).toBe(second.id);
    first.quote.total = 0;
    expect((await repository.listBookings())[0]?.quote.total).toBe(92_400);
  });
  it("has deterministic delayed and failing scenarios", async () => {
    await expect(
      createMockBookingRepository({
        scenario: "error",
        storage: createMemoryStorageAdapter(),
      }).listBookings(),
    ).rejects.toBeInstanceOf(BookingRepositoryError);
    const once = createMockBookingRepository({
      scenario: "fail-once",
      storage: createMemoryStorageAdapter(),
    });
    await expect(once.listBookings()).rejects.toBeInstanceOf(BookingRepositoryError);
    await expect(once.listBookings()).resolves.toEqual([]);
  });

  it("reloads mock booking history through the storage boundary", async () => {
    const storage = createMemoryStorageAdapter();
    await createMockBookingRepository({ storage }).createMockBooking(input);
    const restartedRepository = createMockBookingRepository({ storage });
    await expect(restartedRepository.listBookings()).resolves.toMatchObject([
      { id: "mock-booking-1", status: "confirmed" },
    ]);
  });

  it("treats empty and corrupt mock storage as an empty repository", async () => {
    await expect(
      createMockBookingRepository({ storage: createMemoryStorageAdapter() }).listBookings(),
    ).resolves.toEqual([]);
    for (const persisted of ["not-json", JSON.stringify({ bookings: "wrong", sequence: 2 })]) {
      const storage = createMemoryStorageAdapter({ "cargenie.mock.bookings.v1": persisted });
      await expect(createMockBookingRepository({ storage }).listBookings()).resolves.toEqual([]);
    }
  });

  it("waits for hydration before concurrent reads and writes", async () => {
    const baseStorage = createMemoryStorageAdapter();
    await createMockBookingRepository({ storage: baseStorage }).createMockBooking(input);
    const delayedStorage = {
      ...baseStorage,
      async getItem(key: string) {
        await new Promise<void>((resolve) => setTimeout(resolve, 1));
        return baseStorage.getItem(key);
      },
    };
    const restartedRepository = createMockBookingRepository({ storage: delayedStorage });
    const secondInput = {
      ...input,
      draft: { ...input.draft, confirmationKey: "second" },
    };
    const [, created] = await Promise.all([
      restartedRepository.listBookings(),
      restartedRepository.createMockBooking(secondInput),
    ]);
    expect(created.id).toBe("mock-booking-2");
    await expect(restartedRepository.listBookings()).resolves.toHaveLength(2);
  });

  it("does not commit in-memory state when persistence fails", async () => {
    const baseStorage = createMemoryStorageAdapter();
    let failNextWrite = true;
    const failOnceStorage = {
      ...baseStorage,
      async setItem(key: string, value: string) {
        if (failNextWrite) {
          failNextWrite = false;
          throw new Error("Mock write failed");
        }
        return baseStorage.setItem(key, value);
      },
    };
    const repository = createMockBookingRepository({ storage: failOnceStorage });
    await expect(repository.createMockBooking(input)).rejects.toThrow("Mock write failed");
    await expect(repository.createMockBooking(input)).resolves.toMatchObject({
      id: "mock-booking-1",
    });
    await expect(
      createMockBookingRepository({ storage: baseStorage }).listBookings(),
    ).resolves.toHaveLength(1);
  });

  it("rejects invalid drafts and mismatched quotes at the repository boundary", async () => {
    const repository = createMockBookingRepository({ storage: createMemoryStorageAdapter() });
    await expect(
      repository.createMockBooking({
        ...input,
        draft: { ...input.draft, eligibilityAcknowledged: false },
      }),
    ).rejects.toThrow("incomplete or invalid");
    await expect(
      repository.createMockBooking({
        ...input,
        quote: { ...input.quote, total: input.quote.total + 1 },
      }),
    ).rejects.toThrow("does not match");
  });

  it("provides a repository-only development reset path", async () => {
    const storage = createMemoryStorageAdapter();
    const repository = createMockBookingRepository({ storage });
    await repository.createMockBooking(input);
    await repository.resetMockBookings();
    await expect(createMockBookingRepository({ storage }).listBookings()).resolves.toEqual([]);
  });
});
