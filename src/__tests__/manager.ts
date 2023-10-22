import mockPackages from '../__mocks__/packages.json';
import { calculateCosts, planDelivery } from '../manager';
import { createPackage } from '../models/package';
import { createVehicle } from '../models/vehicle';

describe('calculateCosts()', () => {
  it('should calculate the costs for supplied packages', () => {
    const packages = mockPackages.map((pkg) =>
      createPackage({ ...pkg, baseCost: 100 })
    );

    const results = calculateCosts(packages);

    expect(results).toEqual([
      {
        id: 'PKG1',
        weight: 50,
        distance: 30,
        offerCode: 'OFR001',
        deliveryCost: 750,
        discount: 0,
        totalCost: 750,
      },
      {
        id: 'PKG2',
        weight: 75,
        distance: 125,
        offerCode: 'OFR008',
        deliveryCost: 1475,
        discount: 0,
        totalCost: 1475,
      },
      {
        id: 'PKG3',
        weight: 175,
        distance: 100,
        offerCode: 'OFR003',
        deliveryCost: 2350,
        discount: 0,
        totalCost: 2350,
      },
      {
        id: 'PKG4',
        weight: 110,
        distance: 60,
        offerCode: 'OFR002',
        deliveryCost: 1500,
        discount: 105,
        offer: {
          id: 'OFR002',
          percent: 7,
          distance: {
            min: 50,
            max: 150,
          },
          weight: {
            min: 100,
            max: 250,
          },
        },
        totalCost: 1395,
      },
      {
        id: 'PKG5',
        weight: 155,
        distance: 95,
        deliveryCost: 2125,
        discount: 0,
        totalCost: 2125,
      },
    ]);
  });
});

describe('planDelivery()', () => {
  it('should plan delivery and set delivery time for all packages', () => {
    const vehicle1 = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 70,
      maxWeight: 200,
    });

    const vehicle2 = createVehicle({
      id: 'VEHICLE_2',
      maxSpeed: 70,
      maxWeight: 200,
    });

    const vehicles = [vehicle1, vehicle2];

    const packages = mockPackages.map((pkg) =>
      createPackage({ ...pkg, baseCost: 100 })
    );

    const results = planDelivery(vehicles, packages);

    expect(results.packages).toEqual([
      {
        id: 'PKG1',
        weight: 50,
        distance: 30,
        offerCode: 'OFR001',
        deliveryTime: 0.42,
        arrivalTime: 3.98,
      },
      {
        id: 'PKG2',
        weight: 75,
        distance: 125,
        offerCode: 'OFR008',
        deliveryTime: 1.78,
        arrivalTime: 1.78,
      },
      {
        id: 'PKG3',
        weight: 175,
        distance: 100,
        offerCode: 'OFR003',
        deliveryTime: 1.42,
        arrivalTime: 1.42,
      },
      {
        id: 'PKG4',
        weight: 110,
        distance: 60,
        offerCode: 'OFR002',
        deliveryTime: 0.85,
        arrivalTime: 0.85,
      },
      {
        id: 'PKG5',
        weight: 155,
        distance: 95,
        deliveryTime: 1.35,
        arrivalTime: 4.19,
      },
    ]);

    expect(vehicle1.totalTravelTime).toBe(4.4);
    expect(vehicle2.totalTravelTime).toBe(5.54);
  });
});
