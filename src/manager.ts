import { Package } from './models/package';
import { Vehicle } from './models/vehicle';

import { getBestScenario, simulatePackVehicle } from './utils';

/**
 * Select the next available vehicle based on the total travel time.
 * @param vehicles
 * @returns Vehicle
 */

export const getNextAvailableVehicle = (vehicles: Vehicle[]): Vehicle => {
  return vehicles.toSorted((a, b) => a.totalTravelTime - b.totalTravelTime)[0];
};

/**
 * Create a route plan for the given vehicles and packages.
 * Each vehicle should be assigned a collection of packages to deliver based on the following criteria:
 * 1. The total weight of the packages assigned to a vehicle cannot exceed the vehicle's maxWeight.
 * 2. Vehicle should return to the starting point after delivering all packages, then continue delivering the remaining packages.
 * 3. Vehicle should select packages based on best packing scenario
 *
 * @param vehicles - A collection of vehicles
 * @param packages - A collection of packages
 * @returns Vehicles, packages
 */

type DeliveryPlan = {
  vehicles: Vehicle[];
  packages: Package[];
};

export const calculateCosts = (packages: Package[]): Package[] =>
  packages.map((pkg) => {
    pkg.calculate();
    return pkg;
  });

export const planDelivery = (
  vehicles: Vehicle[],
  packages: Package[]
): DeliveryPlan => {
  let remainingPackages = packages;

  while (remainingPackages.length > 0) {
    const vehicle = getNextAvailableVehicle(vehicles);

    const scenarios = simulatePackVehicle(vehicle, remainingPackages);
    const bestScenario = getBestScenario(scenarios, remainingPackages);

    vehicle.deliverPackages(bestScenario.packages);
    remainingPackages = bestScenario.remainingPackages;
  }

  return { vehicles, packages };
};
