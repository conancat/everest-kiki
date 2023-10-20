import mockPackages from './__mocks__/packages.json';
import { calculateCosts, planDelivery } from './manager';
import { createPackage } from './models/package';
import { createVehicle } from './models/vehicle';

const packages = mockPackages.map((pkg) =>
  createPackage({ ...pkg, baseCost: 100 })
);
const vehicles = Array.from({ length: 2 }).map((_, i) =>
  createVehicle({
    id: `VEHICLE_${i}`,
    maxSpeed: 70,
    maxWeight: 200,
  })
);

calculateCosts(packages);
planDelivery(vehicles, packages);

console.log(JSON.stringify({ vehicles, packages }, null, 2));
