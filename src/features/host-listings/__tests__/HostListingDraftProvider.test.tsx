import { fireEvent, render } from "@testing-library/react-native";
import { Pressable, Text } from "react-native";
import { HostListingDraftProvider, useHostListingDraft } from "../state/HostListingDraftProvider";
const listing = {
  id: "mock-listing-7",
  make: "Kia",
  model: "Sorento",
  year: 2024,
  category: "suv" as const,
  features: ["bluetooth" as const],
  pickupLocation: "Ikeja",
  availability: "daily" as const,
  dailyRateNgn: 50_000,
  image: { id: "mock-suv", label: "Mock SUV" },
  status: "mock-published" as const,
  updatedAt: "2026-07-18T00:00:00.000Z",
};
function Probe() {
  const flow = useHostListingDraft();
  return (
    <>
      <Text>{flow.step}</Text>
      <Text>{flow.draft.make || "empty"}</Text>
      <Text>{flow.listingId ?? "new"}</Text>
      <Pressable accessibilityLabel="next" onPress={flow.nextStep} />
      <Pressable accessibilityLabel="edit" onPress={() => flow.initializeEdit(listing)} />
      <Pressable accessibilityLabel="reset" onPress={flow.reset} />
    </>
  );
}
describe("HostListingDraftProvider", () => {
  it("owns bounded transitions, edit identity, and reset behavior", async () => {
    const { getByLabelText, getByText } = await render(
      <HostListingDraftProvider>
        <Probe />
      </HostListingDraftProvider>,
    );
    await fireEvent.press(getByLabelText("next"));
    expect(getByText("1")).toBeTruthy();
    await fireEvent.press(getByLabelText("edit"));
    expect(getByText("Kia")).toBeTruthy();
    expect(getByText("mock-listing-7")).toBeTruthy();
    await fireEvent.press(getByLabelText("reset"));
    expect(getByText("empty")).toBeTruthy();
    expect(getByText("new")).toBeTruthy();
    expect(getByText("0")).toBeTruthy();
  });
});
