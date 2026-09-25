import { vehicleFixtures } from "@/data/mock/vehicleFixtures";
import { createMockVehicleRepository } from "../repositories/mockVehicleRepository";
import { VehicleRepositoryError } from "../repositories/vehicleRepository";

const baseFilters = { query: "", sort: "recommended" } as const;

describe("mock vehicle repository", () => {
  it("looks up a defensive vehicle detail result and returns null for a missing id", async () => {
    const repository = createMockVehicleRepository();
    const vehicle = await repository.getVehicle("vehicle-001");
    expect(vehicle?.model).toBe("Camry");
    if (vehicle) vehicle.host.name = "Changed in test";
    expect((await repository.getVehicle("vehicle-001"))?.host.name).toBe("Amaka Okafor");
    await expect(repository.getVehicle("missing")).resolves.toBeNull();
  });

  it("filters typed query, location, and inclusive price range", async () => {
    const repository = createMockVehicleRepository();

    const queryResult = await repository.searchVehicles({ ...baseFilters, query: "  hOnDa " });
    const locationResult = await repository.searchVehicles({
      ...baseFilters,
      locationRegion: "Abuja",
    });
    const priceResult = await repository.searchVehicles({
      ...baseFilters,
      maxDailyRateNgn: 42_000,
    });

    expect(queryResult.vehicles.map((vehicle) => vehicle.id)).toEqual(["vehicle-002"]);
    expect(locationResult.vehicles).toHaveLength(2);
    expect(priceResult.vehicles.map((vehicle) => vehicle.dailyRateNgn)).toEqual([42_000, 38_000]);
  });

  it("sorts without mutating the fixture source", async () => {
    const repository = createMockVehicleRepository();
    const result = await repository.searchVehicles({ ...baseFilters, sort: "price-desc" });

    expect(result.vehicles[0]?.dailyRateNgn).toBe(95_000);
    result.vehicles[0]!.host.name = "Changed in test";
    expect(vehicleFixtures.find((vehicle) => vehicle.id === "vehicle-005")?.host.name).toBe(
      "Amaka Okafor",
    );
  });

  it("provides deterministic empty, delayed, error, and retryable failure scenarios", async () => {
    await expect(
      createMockVehicleRepository({ scenario: "empty" }).searchVehicles(baseFilters),
    ).resolves.toEqual({
      vehicles: [],
      total: 0,
    });
    await expect(
      createMockVehicleRepository({ scenario: "delayed", delayMs: 1 }).searchVehicles(baseFilters),
    ).resolves.toMatchObject({ total: 6 });
    await expect(
      createMockVehicleRepository({ scenario: "error" }).searchVehicles(baseFilters),
    ).rejects.toBeInstanceOf(VehicleRepositoryError);

    const failOnce = createMockVehicleRepository({ scenario: "fail-once" });
    await expect(failOnce.searchVehicles(baseFilters)).rejects.toBeInstanceOf(
      VehicleRepositoryError,
    );
    await expect(failOnce.searchVehicles(baseFilters)).resolves.toMatchObject({ total: 6 });
  });
});
