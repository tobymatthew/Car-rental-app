import { asyncStorageAdapter, type StorageAdapter } from "@/data/storage/storageAdapter";
import type { HostListing } from "../domain/hostListing";
import type { ValidHostListingDraft } from "../domain/listingDraft";
import { HostRepositoryError, type HostListingRepository } from "./hostListingRepository";

const seedListingImage = require("../../../../assets/cargenie/car3.jpg");

export type MockHostScenario = "normal" | "empty" | "delayed" | "error" | "fail-once";
type Options = {
  scenario?: MockHostScenario;
  delayMs?: number;
  storage?: StorageAdapter;
  now?: () => string;
  storageKey?: string;
};
type Store = { listings: readonly HostListing[]; sequence: number };

const seedListing: HostListing = {
  id: "mock-listing-1",
  make: "Toyota",
  model: "Highlander",
  year: 2024,
  category: "suv",
  features: ["bluetooth", "backup-camera", "keyless-entry"],
  pickupLocation: "Lekki, Lagos",
  availability: "weekends",
  dailyRateNgn: 65_000,
  image: {
    id: "mock-suv",
    label: "Mock SUV exterior placeholder",
    source: seedListingImage,
  },
  status: "mock-published",
  updatedAt: "2026-07-18T09:00:00.000Z",
};

const copy = (listing: HostListing): HostListing => ({
  ...listing,
  features: [...listing.features],
  image: { ...listing.image },
});

function validate(draft: ValidHostListingDraft) {
  if (
    !draft.make.trim() ||
    !draft.model.trim() ||
    !Number.isInteger(draft.year) ||
    !draft.features.length ||
    !draft.pickupLocation.trim() ||
    !Number.isSafeInteger(draft.dailyRateNgn) ||
    draft.dailyRateNgn <= 0 ||
    !draft.image.id
  ) {
    throw new HostRepositoryError("The mock listing draft is incomplete or invalid.");
  }
}

export function createMockHostListingRepository({
  scenario = "normal",
  delayMs = scenario === "delayed" ? 150 : 0,
  storage = asyncStorageAdapter,
  now = () => new Date().toISOString(),
  storageKey = "cargenie.mock.host-listings.v1",
}: Options = {}): HostListingRepository {
  const listings = new Map<string, HostListing>();
  let sequence = 2;
  let failOnce = scenario === "fail-once";
  let loadPromise: Promise<void> | undefined;
  let writeQueue = Promise.resolve();
  const load = () => {
    loadPromise ??= (async () => {
      const value = await storage.getItem(storageKey);
      if (!value) {
        if (scenario !== "empty") listings.set(seedListing.id, copy(seedListing));
        return;
      }
      try {
        const store = JSON.parse(value) as Store;
        if (!Array.isArray(store.listings) || !Number.isInteger(store.sequence)) return;
        store.listings.forEach((listing) => listings.set(listing.id, copy(listing)));
        sequence = Math.max(2, store.sequence);
      } catch {
        // Corrupt non-sensitive mock storage starts empty.
      }
    })();
    return loadPromise;
  };
  const check = async () => {
    if (delayMs) await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
    if (scenario === "error" || failOnce) {
      failOnce = false;
      throw new HostRepositoryError();
    }
    await load();
  };
  const persist = (next: readonly HostListing[], nextSequence: number) =>
    storage.setItem(
      storageKey,
      JSON.stringify({ listings: next, sequence: nextSequence } satisfies Store),
    );
  return {
    async listListings() {
      await check();
      return [...listings.values()]
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .map(copy);
    },
    async getListing(id) {
      await check();
      const listing = listings.get(id);
      return listing ? copy(listing) : null;
    },
    async saveMockListing({ listingId, draft }) {
      await check();
      validate(draft);
      const operation = writeQueue.then(async () => {
        if (listingId && !listings.has(listingId)) {
          throw new HostRepositoryError("The mock listing to edit was not found.");
        }
        const id = listingId ?? `mock-listing-${sequence}`;
        const listing: HostListing = {
          ...draft,
          features: [...draft.features],
          image: { ...draft.image },
          id,
          status: "mock-published",
          updatedAt: now(),
        };
        const nextSequence = listingId ? sequence : sequence + 1;
        const next = [...listings.values()].filter((current) => current.id !== id).concat(listing);
        await persist(next, nextSequence);
        listings.set(id, listing);
        sequence = nextSequence;
        return copy(listing);
      });
      writeQueue = operation.then(
        () => undefined,
        () => undefined,
      );
      return operation;
    },
  };
}

export const hostListingRepository = createMockHostListingRepository();
