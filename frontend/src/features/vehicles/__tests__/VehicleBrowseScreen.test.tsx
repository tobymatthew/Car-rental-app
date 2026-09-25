import { fireEvent, render, waitFor } from "@testing-library/react-native";

import { VehicleBrowseScreen } from "../components/VehicleBrowseScreen";
import { createMockVehicleRepository } from "../repositories/mockVehicleRepository";

describe("VehicleBrowseScreen", () => {
  it("renders repository-backed vehicle semantics and immediate local search", async () => {
    const { getByLabelText, getByText, queryByText } = await render(
      <VehicleBrowseScreen repository={createMockVehicleRepository()} />,
    );

    await waitFor(() => expect(getByText("Toyota Camry")).toBeTruthy());
    expect(getByText("₦42,000")).toBeTruthy();
    expect(getByLabelText("Toyota Camry vehicle image. Image unavailable.")).toBeTruthy();

    await fireEvent.changeText(getByLabelText("Search cars"), "Lexus");
    await waitFor(() => expect(getByText("Lexus ES 350")).toBeTruthy());
    expect(queryByText("Toyota Camry")).toBeNull();
  });

  it("renders a query-aware empty state and clears filters", async () => {
    const { getByLabelText, getByRole, getByText } = await render(
      <VehicleBrowseScreen repository={createMockVehicleRepository()} />,
    );

    await waitFor(() => expect(getByText("Toyota Camry")).toBeTruthy());
    await fireEvent.changeText(getByLabelText("Search cars"), "not-a-car");
    await waitFor(() => expect(getByText("No vehicles match these filters")).toBeTruthy());
    await fireEvent.press(getByRole("button", { name: "Clear filters" }));
    await waitFor(() => expect(getByText("Toyota Camry")).toBeTruthy());
  });

  it("renders error and retry states with the mock fail-once scenario", async () => {
    const { getByRole, getByText } = await render(
      <VehicleBrowseScreen repository={createMockVehicleRepository({ scenario: "fail-once" })} />,
    );

    await waitFor(() => expect(getByText("Couldn't load vehicles")).toBeTruthy());
    await fireEvent.press(getByRole("button", { name: "Try again" }));
    await waitFor(() => expect(getByText("Toyota Camry")).toBeTruthy());
  });

  it("exposes selected filter controls", async () => {
    const { getByLabelText, getByRole, getByText, queryByText } = await render(
      <VehicleBrowseScreen repository={createMockVehicleRepository()} />,
    );

    await waitFor(() => expect(getByText("Toyota Camry")).toBeTruthy());
    await fireEvent.press(getByLabelText("Filter controls"));
    await fireEvent.press(getByRole("button", { name: "Location, Any location" }));
    await fireEvent.press(getByLabelText("Abuja"));
    expect(getByRole("button", { name: "Location, Abuja" })).toBeTruthy();
    await fireEvent.press(getByRole("button", { name: "Search" }));
    await waitFor(() => expect(getByText("Lexus ES 350")).toBeTruthy());
    expect(queryByText("Toyota Camry")).toBeNull();
  });
});
