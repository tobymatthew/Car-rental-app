import { createMemoryStorageAdapter } from "@/data/storage/storageAdapter";
import { createMockHostListingRepository } from "../repositories/mockHostListingRepository";
import { HostRepositoryError } from "../repositories/hostListingRepository";

const draft = {
  make: "Honda",
  model: "Pilot",
  year: 2025,
  category: "suv" as const,
  features: ["bluetooth" as const],
  pickupLocation: "Wuse, Abuja",
  availability: "daily" as const,
  dailyRateNgn: 70_000,
  image: { id: "mock-suv", label: "Mock SUV" },
};
describe("mock host listing repository", () => {
  it("creates then edits without changing listing identity or count", async () => {
    const repository = createMockHostListingRepository({
      scenario: "empty",
      storage: createMemoryStorageAdapter(),
      now: () => "2026-07-18T12:00:00.000Z",
    });
    const created = await repository.saveMockListing({ draft });
    const edited = await repository.saveMockListing({
      listingId: created.id,
      draft: { ...draft, model: "Pilot Touring" },
    });
    expect(edited).toMatchObject({ id: created.id, model: "Pilot Touring" });
    await expect(repository.listListings()).resolves.toHaveLength(1);
  });
  it("persists mock listings across repository restart", async () => {
    const storage = createMemoryStorageAdapter();
    const first = createMockHostListingRepository({ scenario: "empty", storage });
    const created = await first.saveMockListing({ draft });
    await expect(
      createMockHostListingRepository({ storage }).getListing(created.id),
    ).resolves.toMatchObject({ make: "Honda" });
  });
  it("provides empty, delayed, error, retry, and missing-edit behavior", async () => {
    await expect(
      createMockHostListingRepository({
        scenario: "empty",
        storage: createMemoryStorageAdapter(),
      }).listListings(),
    ).resolves.toEqual([]);
    await expect(
      createMockHostListingRepository({
        scenario: "delayed",
        delayMs: 1,
        storage: createMemoryStorageAdapter(),
      }).listListings(),
    ).resolves.toHaveLength(1);
    await expect(
      createMockHostListingRepository({
        scenario: "error",
        storage: createMemoryStorageAdapter(),
      }).listListings(),
    ).rejects.toBeInstanceOf(HostRepositoryError);
    const retry = createMockHostListingRepository({
      scenario: "fail-once",
      storage: createMemoryStorageAdapter(),
    });
    await expect(retry.listListings()).rejects.toBeInstanceOf(HostRepositoryError);
    await expect(retry.listListings()).resolves.toHaveLength(1);
    await expect(
      createMockHostListingRepository({
        scenario: "empty",
        storage: createMemoryStorageAdapter(),
      }).saveMockListing({ listingId: "missing", draft }),
    ).rejects.toThrow("not found");
  });
});
