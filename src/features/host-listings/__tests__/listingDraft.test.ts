import {
  emptyHostListingDraft,
  toValidListingDraft,
  validateListingDraft,
} from "../domain/listingDraft";

const valid = {
  ...emptyHostListingDraft,
  make: "Toyota",
  model: "Corolla",
  year: "2024",
  features: ["bluetooth" as const],
  pickupLocation: "Ikeja, Lagos",
  dailyRateNgn: "45000",
};
describe("host listing draft", () => {
  it("validates every required step and positive whole-naira pricing", () => {
    expect(validateListingDraft(emptyHostListingDraft)).toMatchObject({
      make: expect.any(String),
      model: expect.any(String),
      year: expect.any(String),
      features: expect.any(String),
      pickupLocation: expect.any(String),
      dailyRateNgn: expect.any(String),
    });
    expect(validateListingDraft({ ...valid, dailyRateNgn: "12.5" })).toMatchObject({
      dailyRateNgn: expect.any(String),
    });
    expect(validateListingDraft(valid)).toEqual({});
  });
  it("creates a typed validated value with a defensive media value", () => {
    const image = { id: "mock-sedan", label: "Mock sedan" };
    const result = toValidListingDraft(valid, image);
    expect(result).toMatchObject({ year: 2024, dailyRateNgn: 45_000, image });
    result.image.label = "Changed";
    expect(image.label).toBe("Mock sedan");
  });
});
