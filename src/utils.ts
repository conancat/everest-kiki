import { Package } from './models/package';
import { Vehicle } from './models/vehicle';

export const sortPackages = (packages: Package[]) => {
  const results = packages.toSorted((a: Package, b: Package) => {
    if (a.weight > b.weight) {
      return -1;
    } else if (a.weight < b.weight) {
      return 1;
    } else if (a.weight === b.weight) {
      if (a.distance > b.distance) {
        return 1;
      } else if (a.distance < b.distance) {
        return -1;
      }
    }

    return a.id.localeCompare(b.id);
  });

  return results;
};

type VehiclePackingScenario = {
  packages: Package[];
  totalWeight: number;
};
type VehiclePackingScenarios = VehiclePackingScenario[];

export const simulatePackVehicle = (vehicle: Vehicle, packages: Package[]) => {
  const scenarios: VehiclePackingScenarios = [];

  const simulate = (vehicle: Vehicle, packages: Package[]) => {
    if (packages.length === 0) {
      return scenarios;
    }

    const sortedPackages = sortPackages(packages);

    const scenario: VehiclePackingScenario = {
      packages: [],
      totalWeight: 0,
    };

    let remainingWeight = vehicle.maxWeight;

    for (const pkg of sortedPackages) {
      if (remainingWeight - pkg.weight >= 0) {
        scenario.packages.push(pkg);
        scenario.totalWeight += pkg.weight;
        remainingWeight -= pkg.weight;
      }
    }

    scenarios.push(scenario);

    const nextPackage = sortedPackages.shift();

    if (nextPackage) {
      simulate(vehicle, sortedPackages);
    }
  };

  simulate(vehicle, packages);

  return scenarios;
};

export const getBestScenario = (
  scenarios: VehiclePackingScenarios,
  packages: Package[]
) => {
  const sortedScenarios = scenarios.toSorted(
    (a: VehiclePackingScenario, b: VehiclePackingScenario) => {
      if (a.totalWeight > b.totalWeight) {
        return -1;
      } else if (a.totalWeight < b.totalWeight) {
        return 1;
      }
      return 0;
    }
  );

  const bestScenario = {
    ...sortedScenarios[0],
    remainingPackages: packages.filter(
      (pkg) => !sortedScenarios[0].packages.map((p) => p.id).includes(pkg.id)
    ),
  };

  return bestScenario;
};
