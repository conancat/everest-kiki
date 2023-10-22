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

describe('Order.prototype.plan()', () => {
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

describe('Order.prototype.calculate()', () => {
  it('should calculate the costs for shipments in an order', () => {
    const order = createOrder({ packages: mockPackages, baseCost: 100 });

    const expectedPackages = [
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
    ];

    order.calculate();

    expect(order.packages).toEqual(expectedPackages);
    expect(order.totalWeight).toBe(565);
    expect(order.totalDistance).toBe(410);
    expect(order.totalDeliveryCost).toBe(8200);
    expect(order.totalDiscount).toBe(105);
    expect(order.finalCost).toBe(8095);
  });
});
