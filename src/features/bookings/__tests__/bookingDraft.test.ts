import { rentalDaysBetween, validateBookingDraft } from "../domain/bookingDraft";

const draft = {
  vehicleId: "vehicle-001",
  startDate: "2026-08-14",
  endDate: "2026-08-16",
  pickupTime: "08:00",
  dropOffTime: "16:00",
  pickupLocation: "Lekki",
  dropOffLocation: "Lekki",
  eligibilityAcknowledged: true,
};
describe("booking draft validation", () => {
  it("requires dates, locations, vehicle, acknowledgement and chronological trip dates", () => {
    expect(
      validateBookingDraft({
        ...draft,
        endDate: "2026-08-14",
        pickupLocation: "",
        eligibilityAcknowledged: false,
      }),
    ).toMatchObject({
      endDate: "Drop-off must be after pickup.",
      pickupLocation: "Enter a pickup location.",
      eligibilityAcknowledged: expect.any(String),
    });
  });
  it("calculates calendar-day rental duration without timezone drift", () => {
    expect(rentalDaysBetween("2026-02-28", "2026-03-01")).toBe(1);
    expect(rentalDaysBetween("bad", "2026-03-01")).toBeNull();
  });
});
