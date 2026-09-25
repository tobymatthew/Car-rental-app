import { calculateQuote } from "../domain/calculateQuote";
const draft = {
  vehicleId: "vehicle-001",
  startDate: "2026-08-14",
  endDate: "2026-08-16",
  pickupTime: "08:00",
  dropOffTime: "16:00",
  pickupLocation: "Lekki",
  dropOffLocation: "Ikeja",
  eligibilityAcknowledged: true,
};
describe("calculateQuote", () => {
  it("uses safe whole-naira values and transparently includes mock fees", () => {
    expect(calculateQuote(draft, { dailyRateNgn: 42_000, currency: "NGN" })).toEqual({
      rentalDays: 2,
      dailyRate: 42_000,
      rentalSubtotal: 84_000,
      serviceFee: 8_400,
      deliveryOrLocationFee: 5_000,
      discounts: 0,
      total: 97_400,
      currency: "NGN",
    });
  });
  it("rejects invalid trips", () => {
    expect(() =>
      calculateQuote(
        { ...draft, endDate: draft.startDate },
        { dailyRateNgn: 42_000, currency: "NGN" },
      ),
    ).toThrow();
  });

  it("rejects fractional, non-finite, and unsafe whole-naira policies", () => {
    for (const dailyRateNgn of [42_000.5, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER]) {
      expect(() => calculateQuote(draft, { dailyRateNgn, currency: "NGN" })).toThrow();
    }
  });
});
