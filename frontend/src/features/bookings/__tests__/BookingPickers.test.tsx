import { fireEvent, render } from "@testing-library/react-native";

import { DateRangePicker } from "../components/DateRangePicker";
import { TimePicker } from "../components/TimePicker";

describe("booking date and time pickers", () => {
  it("selects and applies an accessible rental date range", async () => {
    const onApply = jest.fn();
    const { getByLabelText, getByRole } = await render(
      <DateRangePicker
        endDate=""
        onApply={onApply}
        onClose={jest.fn()}
        startDate="2026-08-14"
        visible
      />,
    );

    await fireEvent.press(getByLabelText(/18 August 2026/));
    await fireEvent.press(getByRole("button", { name: "Apply dates" }));

    expect(onApply).toHaveBeenCalledWith("2026-08-14", "2026-08-18");
  });

  it("selects and applies a labelled pickup time", async () => {
    const onApply = jest.fn();
    const { getByLabelText, getByRole } = await render(
      <TimePicker
        onApply={onApply}
        onClose={jest.fn()}
        title="Choose pickup time"
        value="08:00"
        visible
      />,
    );

    await fireEvent.press(getByLabelText("9:00am"));
    await fireEvent.press(getByRole("button", { name: "Set time" }));
    expect(onApply).toHaveBeenCalledWith("09:00");
  });
});
