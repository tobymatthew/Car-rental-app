import { auditFixtureSizes, createAuditFixtures } from "../audit-fixtures";

describe("audit fixtures", () => {
  it.each([
    ["small", 6],
    ["medium", 50],
    ["stress", 300],
  ] as const)("creates the deterministic %s fixture", (size, expectedCount) => {
    const first = createAuditFixtures(size);
    const second = createAuditFixtures(size);

    expect(first).toEqual(second);
    expect(first.vehicles).toHaveLength(expectedCount);
    expect(first.bookings).toHaveLength(expectedCount);
    expect(first.tripRequests).toHaveLength(expectedCount);
  });

  it("exposes only the supported audit sizes", () => {
    expect(auditFixtureSizes).toEqual(["small", "medium", "stress"]);
  });

  it("includes a reproducible gallery failure case", () => {
    const fixtures = createAuditFixtures("small");

    expect(fixtures.vehicles[0].images[2]).toMatchObject({
      loading: "error",
      url: "https://fixtures.cargenie.test/vehicles/vehicle-001/rear.jpg",
    });
  });
});
