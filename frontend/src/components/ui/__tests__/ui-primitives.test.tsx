import { fireEvent, render } from "@testing-library/react-native";

import { Avatar } from "../Avatar";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { FeedbackState } from "../FeedbackState";
import { Modal } from "../Modal";
import { TextField } from "../TextField";
import { VehicleImage } from "../VehicleImage";

describe("design-system primitives", () => {
  it("exposes button disabled and loading states", async () => {
    const { getByRole } = await render(<Button disabled label="Save draft" loading />);

    expect(getByRole("button").props.accessibilityState).toEqual({ busy: true, disabled: true });
  });

  it("labels required inputs and surfaces their error", async () => {
    const { getByLabelText, getByText } = await render(
      <TextField
        error="Enter a daily price."
        hint="Whole naira only."
        label="Daily price"
        required
      />,
    );

    expect(getByLabelText("Daily price").props.accessibilityHint).toContain("Required field.");
    expect(getByText("Enter a daily price.")).toBeTruthy();
  });

  it("provides meaningful avatar and vehicle fallbacks", async () => {
    const { getByLabelText } = await render(
      <>
        <Avatar label="Amara Okafor" />
        <VehicleImage label="Toyota Corolla vehicle" />
      </>,
    );

    expect(getByLabelText("Amara Okafor avatar")).toBeTruthy();
    expect(getByLabelText(/Toyota Corolla vehicle/)).toBeTruthy();
  });

  it("exposes an informative loaded vehicle image and loading state", async () => {
    const { getByLabelText } = await render(
      <VehicleImage
        label="Honda Civic vehicle"
        source={require("../../../../assets/cargenie/audi.png")}
      />,
    );

    expect(getByLabelText("Honda Civic vehicle")).toBeTruthy();
    expect(getByLabelText("Loading vehicle image")).toBeTruthy();
  });

  it("offers a labelled close action and retry action", async () => {
    const close = jest.fn();
    const retry = jest.fn();
    const { getByLabelText, getByRole } = await render(
      <>
        <Modal onRequestClose={close} title="Vehicle details" visible>
          <Badge label="Available" tone="success" />
        </Modal>
        <FeedbackState
          description="Please check your connection."
          kind="error"
          onRetry={retry}
          title="Couldn't load cars"
        />
      </>,
    );

    await fireEvent.press(getByLabelText("Close Vehicle details"));
    await fireEvent.press(getByRole("button", { name: "Try again" }));
    expect(close).toHaveBeenCalledTimes(1);
    expect(retry).toHaveBeenCalledTimes(1);
  });
});
