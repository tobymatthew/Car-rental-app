import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { createMemoryStorageAdapter } from "@/data/storage/storageAdapter";
import { HostDashboardScreen } from "../components/HostDashboardScreen";
import { createMockHostListingRepository } from "../repositories/mockHostListingRepository";
describe("HostDashboardScreen", () => {
  it("renders accessible normal and empty mock listing states", async () => {
    const normal = await render(
      <HostDashboardScreen
        repository={createMockHostListingRepository({ storage: createMemoryStorageAdapter() })}
      />,
    );
    await waitFor(() => expect(normal.getByText("2024 Toyota Highlander")).toBeTruthy());
    expect(normal.getByLabelText("View 2024 Toyota Highlander mock listing")).toBeTruthy();
    await normal.unmount();
    const empty = await render(
      <HostDashboardScreen
        repository={createMockHostListingRepository({
          scenario: "empty",
          storage: createMemoryStorageAdapter(),
        })}
      />,
    );
    await waitFor(() => expect(empty.getByText("No mock listings")).toBeTruthy());
    await empty.unmount();
  });
  it("recovers from a deterministic repository failure", async () => {
    const screen = await render(
      <HostDashboardScreen
        repository={createMockHostListingRepository({
          scenario: "fail-once",
          storage: createMemoryStorageAdapter(),
        })}
      />,
    );
    await waitFor(() => expect(screen.getByText("Couldn't load mock listings")).toBeTruthy());
    await fireEvent.press(screen.getByRole("button", { name: "Try again" }));
    await waitFor(() => expect(screen.getByText("2024 Toyota Highlander")).toBeTruthy());
  });
});
