import { createMemoryStorageAdapter } from "@/data/storage/storageAdapter";
import { HostTripRequestError } from "../repositories/hostTripRequestRepository";
import { createMockHostTripRequestRepository } from "../repositories/mockHostTripRequestRepository";
describe("mock host trip request repository", () => {
  it("supports the legal pending transition and idempotent same-key retry", async () => {
    const storage = createMemoryStorageAdapter();
    const repository = createMockHostTripRequestRepository({
      storage,
      now: () => "2026-07-18T12:00:00.000Z",
    });
    const input = {
      requestId: "request-001",
      nextStatus: "approved" as const,
      actionKey: "approve-1",
    };
    const first = await repository.updateMockRequestStatus(input);
    const retry = await repository.updateMockRequestStatus(input);
    expect(first.status).toBe("approved");
    expect(retry).toEqual(first);
    await expect(
      createMockHostTripRequestRepository({ storage }).getTripRequest("request-001"),
    ).resolves.toMatchObject({ status: "approved" });
  });
  it("rejects competing keys, stale transitions, and key reuse", async () => {
    const repository = createMockHostTripRequestRepository({
      storage: createMemoryStorageAdapter(),
    });
    await repository.updateMockRequestStatus({
      requestId: "request-001",
      nextStatus: "declined",
      actionKey: "decision",
    });
    await expect(
      repository.updateMockRequestStatus({
        requestId: "request-001",
        nextStatus: "approved",
        actionKey: "other",
      }),
    ).rejects.toThrow("no longer pending");
    await expect(
      repository.updateMockRequestStatus({
        requestId: "request-002",
        nextStatus: "approved",
        actionKey: "decision",
      }),
    ).rejects.toThrow("another outcome");
  });
  it("supports filtering and deterministic empty/error/retry scenarios", async () => {
    const repository = createMockHostTripRequestRepository({
      storage: createMemoryStorageAdapter(),
    });
    await expect(
      repository.listTripRequests({ listingId: "mock-listing-1" }),
    ).resolves.toHaveLength(4);
    await expect(
      createMockHostTripRequestRepository({
        scenario: "empty",
        storage: createMemoryStorageAdapter(),
      }).listTripRequests(),
    ).resolves.toEqual([]);
    await expect(
      createMockHostTripRequestRepository({
        scenario: "error",
        storage: createMemoryStorageAdapter(),
      }).listTripRequests(),
    ).rejects.toBeInstanceOf(HostTripRequestError);
    const retry = createMockHostTripRequestRepository({
      scenario: "fail-once",
      storage: createMemoryStorageAdapter(),
    });
    await expect(retry.listTripRequests()).rejects.toBeInstanceOf(HostTripRequestError);
    await expect(retry.listTripRequests()).resolves.toHaveLength(4);
  });
});
