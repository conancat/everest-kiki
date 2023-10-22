import { Package } from './models/package';
import { Vehicle } from './models/vehicle';

type VehiclePackingScenario = {
  packages: Package[];
  totalWeight: number;
};
type VehiclePackingScenarios = VehiclePackingScenario[];

export const sortPackages = (packages: Package[]) =>
  packages.toSorted((a: Package, b: Package) => {
    if (a.weight > b.weight) {
      return -1;
    } else if (a.weight < b.weight) {
      return 1;
    } else if (a.distance > b.distance) {
      return 1;
    } else if (a.distance < b.distance) {
      return -1;
    }

    return a.id.localeCompare(b.id);
  });

/**
 * Select the next available vehicle based on the vehicle's travel time.
 * @param vehicles
 * @returns Vehicle
 */

export const getNextAvailableVehicle = (vehicles: Vehicle[]): Vehicle => {
  return vehicles.toSorted((a, b) => a.totalTravelTime - b.totalTravelTime)[0];
};
