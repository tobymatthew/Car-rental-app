import { render } from "@testing-library/react-native";

import { QuoteScreen } from "../components/QuoteScreen";
import type { BookingRepository } from "../repositories/bookingRepository";
import { BookingDraftProvider } from "../state/BookingDraftProvider";

describe("QuoteScreen", () => {
  it("blocks a direct route with an incomplete draft before repository creation", async () => {
    const repository: BookingRepository = {
      createMockBooking: jest.fn(),
      listBookings: jest.fn(),
      getBooking: jest.fn(),
    };
    const { getByText } = await render(
      <BookingDraftProvider>
        <QuoteScreen repository={repository} />
      </BookingDraftProvider>,
    );

    expect(getByText("Trip details need updating")).toBeTruthy();
    expect(repository.createMockBooking).not.toHaveBeenCalled();
  });
});
