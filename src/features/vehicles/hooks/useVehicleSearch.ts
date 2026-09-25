import { useEffect, useReducer } from "react";

import type { RepositoryError, VehicleSearchFilters, VehicleSearchResult } from "../types";
import { toRepositoryError, type VehicleRepository } from "../repositories/vehicleRepository";

type VehicleSearchState = {
  status: "loading" | "success" | "error";
  data?: VehicleSearchResult;
  error?: RepositoryError;
};

export function useVehicleSearch({
  repository,
  filters,
}: {
  repository: VehicleRepository;
  filters: VehicleSearchFilters;
}) {
  const {
    query,
    locationRegion,
    maxDailyRateNgn,
    make,
    bodyType,
    color,
    minimumSeats,
    minimumYear,
    transmission,
    sort,
  } = filters;
  const [retryVersion, retry] = useReducer((value: number) => value + 1, 0);
  const [state, setState] = useReducer((_: VehicleSearchState, next: VehicleSearchState) => next, {
    status: "loading",
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setState({ status: "loading" });
    repository
      .searchVehicles(
        {
          query,
          locationRegion,
          maxDailyRateNgn,
          make,
          bodyType,
          color,
          minimumSeats,
          minimumYear,
          transmission,
          sort,
        },
        { signal: controller.signal },
      )
      .then((data) => {
        if (active) setState({ status: "success", data });
      })
      .catch((error: unknown) => {
        if (active && !(error instanceof Error && error.name === "AbortError")) {
          setState({ status: "error", error: toRepositoryError(error) });
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [
    repository,
    locationRegion,
    maxDailyRateNgn,
    make,
    bodyType,
    color,
    minimumSeats,
    minimumYear,
    transmission,
    query,
    retryVersion,
    sort,
  ]);

  return { ...state, retry };
}
