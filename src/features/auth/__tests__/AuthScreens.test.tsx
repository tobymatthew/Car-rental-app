import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";

import { OnboardingScreen } from "@/features/auth/components/OnboardingScreen";
import { SignInScreen } from "@/features/auth/components/SignInScreen";
import { SignUpScreen } from "@/features/auth/components/SignUpScreen";

jest.mock("expo-router", () => ({
  router: { push: jest.fn(), replace: jest.fn() },
}));

describe("mock entry and auth flow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("offers the four-page onboarding journey and auth destinations", async () => {
    const { getByLabelText, getByRole } = await render(<OnboardingScreen />);

    expect(getByLabelText("Page 1 of 4")).toBeTruthy();
    await fireEvent.press(getByLabelText("Show onboarding page 4"));
    expect(getByLabelText("Page 4 of 4")).toBeTruthy();

    await fireEvent.press(getByRole("button", { name: "Sign In" }));
    expect(router.push).toHaveBeenCalledWith("/sign-in");
  });

  it("shows related validation errors and accepts a valid mock sign in", async () => {
    const { getByLabelText, getByRole, getByText } = await render(<SignInScreen />);

    await fireEvent.press(getByRole("button", { name: "Sign In" }));
    expect(getByText("Enter your email address.")).toBeTruthy();
    expect(getByText("Enter your password.")).toBeTruthy();
    expect(router.replace).not.toHaveBeenCalled();

    await fireEvent.changeText(getByLabelText("Email"), "driver@example.com");
    await fireEvent.changeText(getByLabelText("Password"), "mock-pass-123");
    await fireEvent.press(getByRole("button", { name: "Sign In" }));

    expect(router.replace).toHaveBeenCalledWith("/browse");
  });

  it("requires names and terms before mock sign up", async () => {
    const { getByLabelText, getByRole, getByText } = await render(<SignUpScreen />);

    await fireEvent.press(getByRole("button", { name: "Sign Up" }));
    expect(getByText("Enter your first name.")).toBeTruthy();
    expect(getByText("Accept the Terms & Conditions to continue.")).toBeTruthy();

    await fireEvent.changeText(getByLabelText("First Name"), "Mary");
    await fireEvent.changeText(getByLabelText("Last Name"), "Jane");
    await fireEvent.changeText(getByLabelText("Email"), "mary@example.com");
    await fireEvent.changeText(getByLabelText("Password"), "mock-pass-123");
    await fireEvent.press(
      getByRole("checkbox", { name: "I agree to CarGenie's Terms & Conditions" }),
    );
    await fireEvent.press(getByRole("button", { name: "Sign Up" }));

    expect(router.replace).toHaveBeenCalledWith("/browse");
  });
});
