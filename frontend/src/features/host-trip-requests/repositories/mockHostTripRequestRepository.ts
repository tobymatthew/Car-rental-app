import { asyncStorageAdapter, type StorageAdapter } from "@/data/storage/storageAdapter";
import type { TripRequest } from "../domain/tripRequest";
import { HostTripRequestError, type HostTripRequestRepository } from "./hostTripRequestRepository";

type Scenario = "normal" | "empty" | "delayed" | "error" | "fail-once";
type Options = {
  scenario?: Scenario;
  delayMs?: number;
  storage?: StorageAdapter;
  now?: () => string;
  storageKey?: string;
};
type ActionRecord = { requestId: string; nextStatus: "approved" | "declined"; result: TripRequest };
type Store = { requests: readonly TripRequest[]; actions: Readonly<Record<string, ActionRecord>> };

const fixtures: readonly TripRequest[] = [
  {
    id: "request-001",
    listingId: "mock-listing-1",
    vehicleName: "Toyota Highlander",
    renterDisplayName: "Ada (mock renter)",
    startDate: "2026-08-08",
    endDate: "2026-08-10",
    pickupLocation: "Lekki, Lagos",
    dropOffLocation: "Lekki, Lagos",
    estimatedTotalNgn: 143_000,
    status: "pending",
    updatedAt: "2026-07-18T10:00:00.000Z",
  },
  {
    id: "request-002",
    listingId: "mock-listing-1",
    vehicleName: "Toyota Highlander",
    renterDisplayName: "Tobi (mock renter)",
    startDate: "2026-08-15",
    endDate: "2026-08-16",
    pickupLocation: "Lekki, Lagos",
    dropOffLocation: "Ikeja, Lagos",
    estimatedTotalNgn: 76_500,
    status: "approved",
    updatedAt: "2026-07-17T10:00:00.000Z",
  },
  {
    id: "request-003",
    listingId: "mock-listing-1",
    vehicleName: "Toyota Highlander",
    renterDisplayName: "Mina (mock renter)",
    startDate: "2026-07-20",
    endDate: "2026-07-22",
    pickupLocation: "Lekki, Lagos",
    dropOffLocation: "Lekki, Lagos",
    estimatedTotalNgn: 143_000,
    status: "declined",
    updatedAt: "2026-07-16T10:00:00.000Z",
  },
  {
    id: "request-004",
    listingId: "mock-listing-1",
    vehicleName: "Toyota Highlander",
    renterDisplayName: "Femi (mock renter)",
    startDate: "2026-06-10",
    endDate: "2026-06-11",
    pickupLocation: "Lekki, Lagos",
    dropOffLocation: "Lekki, Lagos",
    estimatedTotalNgn: 71_500,
    status: "completed",
    updatedAt: "2026-06-12T10:00:00.000Z",
  },
];
const copy = (request: TripRequest): TripRequest => ({ ...request });

export function createMockHostTripRequestRepository({
  scenario = "normal",
  delayMs = scenario === "delayed" ? 150 : 0,
  storage = asyncStorageAdapter,
  now = () => new Date().toISOString(),
  storageKey = "cargenie.mock.host-trip-requests.v1",
}: Options = {}): HostTripRequestRepository {
  const requests = new Map<string, TripRequest>();
  const actions = new Map<string, ActionRecord>();
  let failOnce = scenario === "fail-once";
  let loadPromise: Promise<void> | undefined;
  let writeQueue = Promise.resolve();
  const load = () => {
    loadPromise ??= (async () => {
      const value = await storage.getItem(storageKey);
      if (!value) {
        if (scenario !== "empty")
          fixtures.forEach((request) => requests.set(request.id, copy(request)));
        return;
      }
      try {
        const store = JSON.parse(value) as Store;
        if (!Array.isArray(store.requests) || !store.actions) return;
        store.requests.forEach((request) => requests.set(request.id, copy(request)));
        Object.entries(store.actions).forEach(([key, action]) =>
          actions.set(key, { ...action, result: copy(action.result) }),
        );
      } catch {
        /* Corrupt mock storage starts empty. */
      }
    })();
    return loadPromise;
  };
  const check = async () => {
    if (delayMs) await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
    if (scenario === "error" || failOnce) {
      failOnce = false;
      throw new HostTripRequestError();
    }
    await load();
  };
  const persist = (
    nextRequests: readonly TripRequest[],
    nextActions: Readonly<Record<string, ActionRecord>>,
  ) =>
    storage.setItem(
      storageKey,
      JSON.stringify({ requests: nextRequests, actions: nextActions } satisfies Store),
    );
  return {
    async listTripRequests(input) {
      await check();
      return [...requests.values()]
        .filter((request) => !input?.listingId || request.listingId === input.listingId)
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .map(copy);
    },
    async getTripRequest(id) {
      await check();
      const request = requests.get(id);
      return request ? copy(request) : null;
    },
    async updateMockRequestStatus({ requestId, nextStatus, actionKey }) {
      await check();
      if (!actionKey.trim())
        throw new HostTripRequestError("A mock request action key is required.");
      const operation = writeQueue.then(async () => {
        const priorAction = actions.get(actionKey);
        if (priorAction) {
          if (priorAction.requestId !== requestId || priorAction.nextStatus !== nextStatus)
            throw new HostTripRequestError(
              "This mock action key was already used for another outcome.",
            );
          return copy(priorAction.result);
        }
        const current = requests.get(requestId);
        if (!current) throw new HostTripRequestError("The mock trip request was not found.");
        if (current.status !== "pending")
          throw new HostTripRequestError("This mock trip request is no longer pending.");
        const result: TripRequest = { ...current, status: nextStatus, updatedAt: now() };
        const action: ActionRecord = { requestId, nextStatus, result: copy(result) };
        const nextActions = Object.fromEntries([...actions.entries(), [actionKey, action]]);
        const nextRequests = [...requests.values()]
          .filter((request) => request.id !== requestId)
          .concat(result);
        await persist(nextRequests, nextActions);
        requests.set(requestId, result);
        actions.set(actionKey, action);
        return copy(result);
      });
      writeQueue = operation.then(
        () => undefined,
        () => undefined,
      );
      return operation;
    },
  };
}

export const hostTripRequestRepository = createMockHostTripRequestRepository();
