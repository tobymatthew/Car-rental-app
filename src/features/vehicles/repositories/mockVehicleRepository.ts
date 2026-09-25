import { vehicleFixtures } from "@/data/mock/vehicleFixtures";
import type { Vehicle, VehicleSearchFilters, VehicleSearchResult } from "../types";
import { VehicleRepositoryError, type VehicleRepository } from "./vehicleRepository";

export type MockVehicleRepositoryScenario = "normal" | "empty" | "delayed" | "error" | "fail-once";

type MockVehicleRepositoryOptions = {
  scenario?: MockVehicleRepositoryScenario;
  delayMs?: number;
  vehicles?: readonly Vehicle[];
};

function abortError() {
  const error = new Error("The request was cancelled.");
  error.name = "AbortError";
  return error;
}

function wait(delayMs: number, signal?: AbortSignal) {
  if (!delayMs) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, delayMs);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(abortError());
      },
      { once: true },
    );
  });
}

function search(vehicles: readonly Vehicle[], filters: VehicleSearchFilters): VehicleSearchResult {
  const query = filters.query.trim().toLocaleLowerCase();
  const matched = vehicles.filter((vehicle) => {
    const searchable = [
      vehicle.make,
      vehicle.model,
      vehicle.location.displayName,
      vehicle.location.city,
      vehicle.location.area,
      ...vehicle.features.map((feature) => feature.label),
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase();

    return (
      (!query || searchable.includes(query)) &&
      (!filters.locationRegion || vehicle.location.region === filters.locationRegion) &&
      (!filters.maxDailyRateNgn || vehicle.dailyRateNgn <= filters.maxDailyRateNgn) &&
      (!filters.make || vehicle.make === filters.make) &&
      (!filters.bodyType || vehicle.bodyType === filters.bodyType) &&
      (!filters.color || vehicle.color === filters.color) &&
      (!filters.minimumSeats || vehicle.seats >= filters.minimumSeats) &&
      (!filters.minimumYear || vehicle.year >= filters.minimumYear) &&
      (!filters.transmission || vehicle.transmission === filters.transmission)
    );
  });

  const sorted = [...matched].sort((left, right) => {
    const rateOrder =
      filters.sort === "price-asc"
        ? left.dailyRateNgn - right.dailyRateNgn
        : filters.sort === "price-desc"
          ? right.dailyRateNgn - left.dailyRateNgn
          : 0;
    return rateOrder || left.id.localeCompare(right.id);
  });

  return {
    vehicles: sorted.map((vehicle) => ({
      ...vehicle,
      location: { ...vehicle.location },
      host: { ...vehicle.host },
      images: vehicle.images.map((image) => ({ ...image })),
      features: vehicle.features.map((feature) => ({ ...feature })),
    })),
    total: sorted.length,
  };
}

export function createMockVehicleRepository({
  scenario = "normal",
  delayMs = scenario === "delayed" ? 150 : 0,
  vehicles = vehicleFixtures,
}: MockVehicleRepositoryOptions = {}): VehicleRepository {
  let shouldFail = scenario === "fail-once";

  return {
    async searchVehicles(filters, options) {
      if (options?.signal?.aborted) throw abortError();
      await wait(delayMs, options?.signal);
      if (options?.signal?.aborted) throw abortError();

      if (scenario === "error" || shouldFail) {
        shouldFail = false;
        throw new VehicleRepositoryError({
          code: "INVENTORY_UNAVAILABLE",
          message: "We couldn't load vehicles. Please try again.",
          retryable: true,
        });
      }

      return scenario === "empty" ? { vehicles: [], total: 0 } : search(vehicles, filters);
    },
    async getVehicle(id, options) {
      if (options?.signal?.aborted) throw abortError();
      await wait(delayMs, options?.signal);
      if (options?.signal?.aborted) throw abortError();
      if (scenario === "error" || shouldFail) {
        shouldFail = false;
        throw new VehicleRepositoryError({
          code: "INVENTORY_UNAVAILABLE",
          message: "We couldn't load vehicles. Please try again.",
          retryable: true,
        });
      }
      const vehicle =
        scenario === "empty" ? undefined : vehicles.find((candidate) => candidate.id === id);
      return vehicle
        ? {
            ...vehicle,
            location: { ...vehicle.location },
            host: { ...vehicle.host },
            images: vehicle.images.map((image) => ({ ...image })),
            features: vehicle.features.map((feature) => ({ ...feature })),
          }
        : null;
    },
  };
}

export const vehicleRepository = createMockVehicleRepository();
