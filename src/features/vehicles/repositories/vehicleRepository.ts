import type { RepositoryError, Vehicle, VehicleSearchFilters, VehicleSearchResult } from "../types";

export type VehicleSearchRequestOptions = { signal?: AbortSignal };

export interface VehicleRepository {
  searchVehicles(
    filters: VehicleSearchFilters,
    options?: VehicleSearchRequestOptions,
  ): Promise<VehicleSearchResult>;
  getVehicle(id: string, options?: VehicleSearchRequestOptions): Promise<Vehicle | null>;
}

export class VehicleRepositoryError extends Error {
  readonly details: RepositoryError;

  constructor(details: RepositoryError) {
    super(details.message);
    this.name = "VehicleRepositoryError";
    this.details = details;
  }
}

export function toRepositoryError(error: unknown): RepositoryError {
  if (error instanceof VehicleRepositoryError) return error.details;

  return {
    code: "UNKNOWN",
    message: "We couldn't load vehicles. Please try again.",
    retryable: true,
  };
}
