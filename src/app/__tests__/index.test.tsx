import { act, render } from "@testing-library/react-native";
import { router } from "expo-router";

import LaunchScreen, { SPLASH_DURATION_MS } from "../index";

jest.mock("expo-router", () => ({
  router: { replace: jest.fn() },
}));

describe("LaunchScreen", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the branded splash before entering onboarding", async () => {
    const { getByLabelText, getByTestId } = await render(<LaunchScreen />);

    expect(getByTestId("branded-splash")).toBeTruthy();
    expect(getByLabelText("CarGenie is opening")).toBeTruthy();
    expect(router.replace).not.toHaveBeenCalled();
  });

  it("continues to onboarding after the branded splash", async () => {
    await render(<LaunchScreen />);

    await act(async () => {
      jest.advanceTimersByTime(SPLASH_DURATION_MS);
    });

    expect(router.replace).toHaveBeenCalledWith("/onboarding");
  });
});
