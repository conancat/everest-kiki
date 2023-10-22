import { Shipment } from '../shipment';
import { Vehicle, createVehicle } from '../vehicle';

import mockPackages from '../../__mocks__/packages.json';
import { createPackage } from '../package';
import { create } from 'domain';

describe('Shipment.simulate()', () => {
  it('should simulate possible vehicle packing scenarios: 5 packages (Step 01)', () => {
    const vehicle: Vehicle = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 50,
      maxWeight: 200,
    });

    const results = Shipment.simulate(mockPackages.map(createPackage), vehicle);

    expect(results).toEqual([
      {
        packages: [
          {
            id: 'PKG3',
            weight: 175,
            distance: 100,
            offerCode: 'OFR003',
          },
        ],
        totalWeight: 175,
      },
      {
        packages: [
          {
            id: 'PKG5',
            weight: 155,
            distance: 95,
          },
        ],
        totalWeight: 155,
      },
      {
        packages: [
          {
            id: 'PKG4',
            weight: 110,
            distance: 60,
            offerCode: 'OFR002',
          },
          {
            id: 'PKG2',
            weight: 75,
            distance: 125,
            offerCode: 'OFR008',
          },
        ],
        totalWeight: 185,
      },
      {
        packages: [
          {
            id: 'PKG2',
            weight: 75,
            distance: 125,
            offerCode: 'OFR008',
          },
          {
            id: 'PKG1',
            weight: 50,
            distance: 30,
            offerCode: 'OFR001',
          },
        ],
        totalWeight: 125,
      },
      {
        packages: [
          {
            id: 'PKG1',
            weight: 50,
            distance: 30,
            offerCode: 'OFR001',
          },
        ],
        totalWeight: 50,
      },
    ]);
  });

  it('should simulate possible vehicle packing scenarios: 3 packages (Step 02)', () => {
    const vehicle: Vehicle = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 50,
      maxWeight: 200,
    });

    const packages = mockPackages
      .filter((pkg) => ['PKG1', 'PKG3', 'PKG5'].includes(pkg.id))
      .map(createPackage);

    const results = Shipment.simulate(packages, vehicle);

    expect(results).toEqual([
      {
        packages: [
          {
            id: 'PKG3',
            weight: 175,
            distance: 100,
            offerCode: 'OFR003',
          },
        ],
        totalWeight: 175,
      },
      {
        packages: [
          {
            id: 'PKG5',
            weight: 155,
            distance: 95,
          },
        ],
        totalWeight: 155,
      },
      {
        packages: [
          {
            id: 'PKG1',
            weight: 50,
            distance: 30,
            offerCode: 'OFR001',
          },
        ],
        totalWeight: 50,
      },
    ]);
  });

  it('should simulate possible vehicle packing scenarios: 2 packages (Step 04)', () => {
    const vehicle: Vehicle = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 50,
      maxWeight: 200,
    });

    const packages = mockPackages
      .filter((pkg) => ['PKG1', 'PKG5'].includes(pkg.id))
      .map(createPackage);

    const results = Shipment.simulate(packages, vehicle);

    expect(results).toEqual([
      {
        packages: [
          {
            id: 'PKG5',
            weight: 155,
            distance: 95,
          },
        ],
        totalWeight: 155,
      },
      {
        packages: [
          {
            id: 'PKG1',
            weight: 50,
            distance: 30,
            offerCode: 'OFR001',
          },
        ],
        totalWeight: 50,
      },
    ]);
  });

  it('should simulate possible vehicle packing scenarios: 1 package (Step 06)', () => {
    const vehicle: Vehicle = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 50,
      maxWeight: 200,
    });

    const packages = mockPackages
      .filter((pkg) => pkg.id === 'PKG1')
      .map(createPackage);

    const results = Shipment.simulate(packages, vehicle);

    expect(results).toEqual([
      {
        packages: [
          {
            id: 'PKG1',
            weight: 50,
            distance: 30,
            offerCode: 'OFR001',
          },
        ],
        totalWeight: 50,
      },
    ]);
  });
});

describe('Shipment.plan()', () => {
  it('should get best scenario based on total weight carried by vehicle: 5 packages (Step 01)', () => {
    const vehicle: Vehicle = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 50,
      maxWeight: 200,
    });

    const plan = Shipment.plan(mockPackages.map(createPackage), vehicle);

    expect(plan).toEqual({
      shipment: {
        packages: [
          {
            id: 'PKG4',
            weight: 110,
            distance: 60,
            offerCode: 'OFR002',
          },
          {
            id: 'PKG2',
            weight: 75,
            distance: 125,
            offerCode: 'OFR008',
          },
        ],
        totalWeight: 185,
        vehicle: {
          packages: [],
          deliveries: [],
          totalTravelTime: 0,
          id: 'VEHICLE_1',
          maxSpeed: 50,
          maxWeight: 200,
        },
      },
      remainingPackages: [
        {
          id: 'PKG1',
          weight: 50,
          distance: 30,
          offerCode: 'OFR001',
        },
        {
          id: 'PKG3',
          weight: 175,
          distance: 100,
          offerCode: 'OFR003',
        },
        {
          id: 'PKG5',
          weight: 155,
          distance: 95,
        },
      ],
    });
  });

  it('should get best scenario based on total weight carried by vehicle: 3 packages (Step 02)', () => {
    const vehicle: Vehicle = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 50,
      maxWeight: 200,
    });

    const packages = mockPackages
      .filter((pkg) => ['PKG1', 'PKG3', 'PKG5'].includes(pkg.id))
      .map(createPackage);

    const plan = Shipment.plan(packages, vehicle);

    expect(plan).toEqual({
      shipment: {
        packages: [
          {
            id: 'PKG3',
            weight: 175,
            distance: 100,
            offerCode: 'OFR003',
          },
        ],
        totalWeight: 175,
        vehicle: {
          packages: [],
          deliveries: [],
          totalTravelTime: 0,
          id: 'VEHICLE_1',
          maxSpeed: 50,
          maxWeight: 200,
        },
      },
      remainingPackages: [
        {
          id: 'PKG1',
          weight: 50,
          distance: 30,
          offerCode: 'OFR001',
        },
        {
          id: 'PKG5',
          weight: 155,
          distance: 95,
        },
      ],
    });
  });

  it('should get best scenario based on total weight carried by vehicle: 2 packages (Step 04)', () => {
    const vehicle: Vehicle = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 50,
      maxWeight: 200,
    });

    const packages = mockPackages
      .filter((pkg) => ['PKG1', 'PKG5'].includes(pkg.id))
      .map(createPackage);

    const plan = Shipment.plan(packages, vehicle);

    expect(plan).toEqual({
      shipment: {
        packages: [
          {
            id: 'PKG5',
            weight: 155,
            distance: 95,
          },
        ],
        totalWeight: 155,
        vehicle: {
          packages: [],
          deliveries: [],
          totalTravelTime: 0,
          id: 'VEHICLE_1',
          maxSpeed: 50,
          maxWeight: 200,
        },
      },
      remainingPackages: [
        {
          id: 'PKG1',
          weight: 50,
          distance: 30,
          offerCode: 'OFR001',
        },
      ],
    });
  });

  it('should get best scenario based on total weight carried by vehicle: 1 packages (Step 06)', () => {
    const vehicle: Vehicle = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 50,
      maxWeight: 200,
    });

    const packages = mockPackages
      .filter((pkg) => pkg.id === 'PKG1')
      .map(createPackage);

    const plan = Shipment.plan(packages, vehicle);

    expect(plan).toEqual({
      shipment: {
        packages: [
          {
            id: 'PKG1',
            weight: 50,
            distance: 30,
            offerCode: 'OFR001',
          },
        ],
        totalWeight: 50,
        vehicle: {
          packages: [],
          deliveries: [],
          totalTravelTime: 0,
          id: 'VEHICLE_1',
          maxSpeed: 50,
          maxWeight: 200,
        },
      },
      remainingPackages: [],
    });
  });
});

describe('shipment.commit()', () => {
  it('should commit shipment to vehicle: 5 packages (Step 01)', () => {
    const vehicle: Vehicle = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 50,
      maxWeight: 200,
    });
    const packages = mockPackages.map(createPackage);

    const expectedPackages = [
      {
        id: 'PKG4',
        weight: 110,
        distance: 60,
        offerCode: 'OFR002',
        deliveryTime: 1.2,
        arrivalTime: 1.2,
      },
      {
        id: 'PKG2',
        weight: 75,
        distance: 125,
        offerCode: 'OFR008',
        deliveryTime: 2.5,
        arrivalTime: 2.5,
      },
    ];

    const plan = Shipment.plan(packages, vehicle);

    const shipment = plan.shipment;

    shipment.commit();

    expect(shipment.packages).toEqual(expectedPackages);
    expect(shipment.vehicle.packages).toEqual(expectedPackages);
    expect(shipment.vehicle.deliveries).toEqual([expectedPackages]);
    expect(shipment.vehicle.totalTravelTime).toEqual(5);
  });
});
