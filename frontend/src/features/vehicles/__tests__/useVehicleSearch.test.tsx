import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Pressable, Text } from "react-native";

import { createMockVehicleRepository } from "../repositories/mockVehicleRepository";
import type { VehicleRepository } from "../repositories/vehicleRepository";
import type { VehicleSearchFilters, VehicleSearchResult } from "../types";
import { useVehicleSearch } from "../hooks/useVehicleSearch";

function SearchProbe({
  repository,
  filters,
}: {
  repository: VehicleRepository;
  filters: VehicleSearchFilters;
}) {
  const { status, data, retry } = useVehicleSearch({ repository, filters });
  return (
    <>
      <Text>{status}</Text>
      <Text>{data?.vehicles[0]?.model ?? "no result"}</Text>
      <Pressable accessibilityLabel="Retry vehicle search" onPress={retry}>
        <Text>Retry</Text>
      </Pressable>
    </>
  );
}

describe("useVehicleSearch", () => {
  it("moves from loading to success and does not apply a stale response", async () => {
    const requests: { resolve: (value: VehicleSearchResult) => void }[] = [];
    const repository: VehicleRepository = {
      searchVehicles: jest.fn(
        () =>
          new Promise<VehicleSearchResult>((resolve) => {
            requests.push({ resolve });
          }),
      ),
      getVehicle: jest.fn(async () => null),
    };
    const camryFilters = { query: "Camry", sort: "recommended" } as const;
    const lexusFilters = { query: "Lexus", sort: "recommended" } as const;
    const { getByText, rerender } = await render(
      <SearchProbe filters={camryFilters} repository={repository} />,
    );

    expect(getByText("loading")).toBeTruthy();
    await rerender(<SearchProbe filters={lexusFilters} repository={repository} />);
    requests[0]?.resolve({ vehicles: [], total: 0 });
    requests[1]?.resolve(await createMockVehicleRepository().searchVehicles(lexusFilters));

    await waitFor(() => expect(getByText("ES 350")).toBeTruthy());
  });

  it("exposes a recoverable error and retries the current request", async () => {
    const repository = createMockVehicleRepository({ scenario: "fail-once" });
    const { getByLabelText, getByText } = await render(
      <SearchProbe filters={{ query: "", sort: "recommended" }} repository={repository} />,
    );

    await waitFor(() => expect(getByText("error")).toBeTruthy());
    await fireEvent.press(getByLabelText("Retry vehicle search"));
    await waitFor(() => expect(getByText("Camry")).toBeTruthy());
  });
});
