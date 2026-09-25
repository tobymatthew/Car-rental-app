import { render, waitFor } from "@testing-library/react-native";
import { createMemoryStorageAdapter } from "@/data/storage/storageAdapter";
import { TripRequestDetailScreen } from "../components/TripRequestDetailScreen";
import { TripRequestListScreen } from "../components/TripRequestListScreen";
import { createMockHostTripRequestRepository } from "../repositories/mockHostTripRequestRepository";
describe("host trip request screens", () => {
  it("renders every mock status with text in the request list", async () => {
    const screen = await render(
      <TripRequestListScreen
        repository={createMockHostTripRequestRepository({ storage: createMemoryStorageAdapter() })}
      />,
    );
    for (const label of [
      "Pending (mock)",
      "Approved (mock)",
      "Declined (mock)",
      "Completed (mock)",
    ])
      await waitFor(() => expect(screen.getByText(label)).toBeTruthy());
  });
  it("offers actions only for a pending request", async () => {
    const repository = createMockHostTripRequestRepository({
      storage: createMemoryStorageAdapter(),
    });
    const pending = await render(
      <TripRequestDetailScreen requestId="request-001" repository={repository} />,
    );
    await waitFor(() =>
      expect(pending.getByRole("button", { name: "Approve mock request" })).toBeTruthy(),
    );
    await pending.unmount();
    const terminal = await render(
      <TripRequestDetailScreen requestId="request-002" repository={repository} />,
    );
    await waitFor(() =>
      expect(terminal.getByText("This request is no longer actionable.")).toBeTruthy(),
    );
    expect(terminal.queryByRole("button", { name: "Approve mock request" })).toBeNull();
  });
});
