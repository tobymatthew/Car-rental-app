import { render, waitFor } from "@testing-library/react-native";

import BrowseRoute from "../browse";

describe("BrowseRoute", () => {
  it("composes the renter browse feature", async () => {
    const { getByText } = await render(<BrowseRoute />);

    await waitFor(() => expect(getByText("Hello, Mary")).toBeTruthy());
  });
});
