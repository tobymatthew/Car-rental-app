import { fireEvent, render } from "@testing-library/react-native";

import { HostListingFormExample } from "../HostListingFormExample";
import { VehicleCardExample } from "../VehicleCardExample";

describe("design-system reference compositions", () => {
  it("renders renter vehicle facts, availability, host, and price", async () => {
    const { getByText } = await render(<VehicleCardExample />);

    expect(getByText("Toyota Corolla")).toBeTruthy();
    expect(getByText("Available")).toBeTruthy();
    expect(getByText("Hosted by")).toBeTruthy();
    expect(getByText("₦45,000")).toBeTruthy();
  });

  it("supports host listing field states and local attribute selection", async () => {
    const { getByLabelText, getByText } = await render(<HostListingFormExample />);

    expect(getByLabelText("Vehicle make and model")).toBeTruthy();
    expect(getByText("Save draft").parent?.props.accessibilityState.disabled).toBe(true);
    await fireEvent.press(getByLabelText("Manual transmission"));
    expect(getByText("Selected")).toBeTruthy();
  });
});
