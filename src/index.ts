import mockPackages from './__mocks__/packages.json';
import { createOrder } from './models/order';
import { createVehicle } from './models/vehicle';

const packages = mockPackages;
const vehicles = Array.from({ length: 2 }).map((_, i) =>
  createVehicle({
    id: `VEHICLE_${i}`,
    maxSpeed: 70,
    maxWeight: 200,
  })
);

const order = createOrder({
  packages,
  baseCost: 100,
});

order.plan(vehicles);

console.log(JSON.stringify(order, null, 2));
