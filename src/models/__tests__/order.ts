import mockPackages from '../../__mocks__/packages.json';
import { createOrder } from '../order';
import { createPackage } from '../package';
import { createVehicle } from '../vehicle';

describe('createOrder()', () => {
  it('should create a new order with the provided Packages', () => {
    const baseCost = 100;

    const order = createOrder({
      packages: mockPackages,
      baseCost,
    });

    const expectedPackages = mockPackages.map((pkg) =>
      createPackage({
        ...pkg,
        baseCost,
      })
    );

    expect(order.packages).toEqual(expectedPackages);
  });
});

describe('order.plan()', () => {
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

    const expectedPackages = [
      {
        id: 'PKG1',
        weight: 50,
        distance: 30,
        offerCode: 'OFR001',
        deliveryTime: 0.42,
        finalDeliveryTime: 3.98,
      },
      {
        id: 'PKG2',
        weight: 75,
        distance: 125,
        offerCode: 'OFR008',
        deliveryTime: 1.78,
        finalDeliveryTime: 1.78,
      },
      {
        id: 'PKG3',
        weight: 175,
        distance: 100,
        offerCode: 'OFR003',
        deliveryTime: 1.42,
        finalDeliveryTime: 1.42,
      },
      {
        id: 'PKG4',
        weight: 110,
        distance: 60,
        offerCode: 'OFR002',
        deliveryTime: 0.85,
        finalDeliveryTime: 0.85,
      },
      {
        id: 'PKG5',
        weight: 155,
        distance: 95,
        deliveryTime: 1.35,
        finalDeliveryTime: 4.19,
      },
    ];

    const expectedShipment1 = {
      packages: expect.arrayContaining(
        expectedPackages.filter((pkg) => ['PKG2', 'PKG4'].includes(pkg.id))
      ),
      totalWeight: 185,
      vehicle: vehicle1,
    };

    const expectedShipment2 = {
      packages: expectedPackages.filter((pkg) => ['PKG3'].includes(pkg.id)),
      totalWeight: 175,
      vehicle: vehicle2,
    };

    const expectedShipment3 = {
      packages: expectedPackages.filter((pkg) => ['PKG5'].includes(pkg.id)),
      totalWeight: 155,
      vehicle: vehicle2,
    };

    const expectedShipment4 = {
      packages: expectedPackages.filter((pkg) => ['PKG1'].includes(pkg.id)),
      totalWeight: 50,
      vehicle: vehicle1,
    };

    const expectedShipments = [
      expectedShipment1,
      expectedShipment2,
      expectedShipment3,
      expectedShipment4,
    ];

    const vehicles = [vehicle1, vehicle2];

    const order = createOrder({ packages: mockPackages, baseCost: 100 });

    order.plan(vehicles);

    expect(order.packages).toEqual(expectedPackages);
    expect(order.shipments).toEqual(expectedShipments);

    expect(vehicle1.totalTravelTime).toBe(4.4);
    expect(vehicle2.totalTravelTime).toBe(5.54);
  });
});
