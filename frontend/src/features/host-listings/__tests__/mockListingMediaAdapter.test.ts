import { mockListingMediaAdapter } from "../media/mockListingMediaAdapter";
describe("mock listing media adapter", () => {
  it("returns deterministic defensive options and null for unknown selections", async () => {
    const options = await mockListingMediaAdapter.listOptions();
    expect(options.map((option) => option.id)).toEqual(["mock-sedan", "mock-suv", "mock-van"]);
    options[0]!.label = "Changed";
    expect((await mockListingMediaAdapter.getOption("mock-sedan"))?.label).toBe(
      "Mock sedan exterior placeholder",
    );
    await expect(mockListingMediaAdapter.getOption("unknown")).resolves.toBeNull();
  });
});
