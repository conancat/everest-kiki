import { Package } from './models/package';
import Shipment from './models/shipment';
import { Vehicle } from './models/vehicle';

/**
 * Select the next available vehicle based on the vehicle's travel time.
 * @param vehicles
 * @returns Vehicle
 */

export const getNextAvailableVehicle = (vehicles: Vehicle[]): Vehicle => {
  return vehicles.toSorted((a, b) => a.totalTravelTime - b.totalTravelTime)[0];
};

type DeliveryPlan = {
  vehicles: Vehicle[];
  packages: Package[];
};

export const calculateCosts = (packages: Package[]): Package[] =>
  packages.map((pkg) => {
    pkg.calculate();
    return pkg;
  });

/**
 * Create a delivery plan for the given vehicles and packages.
 *
 * @param vehicles - A collection of vehicles
 * @param packages - A collection of packages
 * @returns Vehicles, packages
 */

export const planDelivery = (
  vehicles: Vehicle[],
  packages: Package[]
): DeliveryPlan => {
  let remainingPackages = packages;

  while (remainingPackages.length > 0) {
    const vehicle = getNextAvailableVehicle(vehicles);
    const plan = Shipment.plan(remainingPackages, vehicle);
    plan.shipment.commit();
    remainingPackages = plan.remainingPackages;
  }

  return { vehicles, packages };
};
