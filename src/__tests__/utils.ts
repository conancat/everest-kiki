import { Package } from '../models/package';
import mockPackages from '../__mocks__/packages.json';
import { sortPackages, simulatePackVehicle } from '../utils';
import { Vehicle } from '../models/vehicle';

describe('sortPackages()', () => {
  it('should sort packages by weight in descending order when packages weights are not the same', () => {
    const packages: Package[] = [
      {
        id: 'TEST_PKG1',
        weight: 50,
        distance: 100,
      },
      {
        id: 'TEST_PKG2',
        weight: 75,
        distance: 125,
      },
      {
        id: 'TEST_PKG3',
        weight: 110,
        distance: 30,
      },
      {
        id: 'TEST_PKG4',
        weight: 150,
        distance: 40,
      },
      {
        id: 'TEST_PKG5',
        weight: 25,
        distance: 30,
      },
    ];

    const expectedPackages = [
      {
        id: 'TEST_PKG4',
        weight: 150,
        distance: 40,
      },
      {
        id: 'TEST_PKG3',
        weight: 110,
        distance: 30,
      },
      {
        id: 'TEST_PKG2',
        weight: 75,
        distance: 125,
      },
      {
        id: 'TEST_PKG1',
        weight: 50,
        distance: 100,
      },
      {
        id: 'TEST_PKG5',
        weight: 25,
        distance: 30,
      },
    ];

    const sortedPackages = sortPackages(packages);

    expect(sortedPackages).toEqual(expectedPackages);
  });

  it('should sort by distance in ascending order when packages weights are the same', () => {
    const packages: Package[] = [
      {
        id: 'TEST_PKG1',
        weight: 80,
        distance: 100,
      },
      {
        id: 'TEST_PKG2',
        weight: 80,
        distance: 125,
      },
      {
        id: 'TEST_PKG3',
        weight: 80,
        distance: 30,
      },
      {
        id: 'TEST_PKG4',
        weight: 80,
        distance: 40,
      },
      {
        id: 'TEST_PKG5',
        weight: 80,
        distance: 60,
      },
    ];

    const expectedPackages = [
      {
        id: 'TEST_PKG3',
        weight: 80,
        distance: 30,
      },
      {
        id: 'TEST_PKG4',
        weight: 80,
        distance: 40,
      },
      {
        id: 'TEST_PKG5',
        weight: 80,
        distance: 60,
      },
      {
        id: 'TEST_PKG1',
        weight: 80,
        distance: 100,
      },
      {
        id: 'TEST_PKG2',
        weight: 80,
        distance: 125,
      },
    ];

    const sortedPackages = sortPackages(packages);

    expect(sortedPackages).toEqual(expectedPackages);
  });

  it('should sort packages by id in ascending order when both packages and distances are the same', () => {
    const packages: Package[] = [
      {
        id: 'TEST_PKG1',
        weight: 80,
        distance: 100,
      },
      {
        id: 'TEST_PKG2',
        weight: 80,
        distance: 125,
      },
      {
        id: 'TEST_PKG3',
        weight: 80,
        distance: 60,
      },
      {
        id: 'TEST_PKG4',
        weight: 80,
        distance: 100,
      },
      {
        id: 'TEST_PKG5',
        weight: 80,
        distance: 60,
      },
    ];

    const expectedPackages = [
      {
        id: 'TEST_PKG3',
        weight: 80,
        distance: 60,
      },
      {
        id: 'TEST_PKG5',
        weight: 80,
        distance: 60,
      },
      {
        id: 'TEST_PKG1',
        weight: 80,
        distance: 100,
      },
      {
        id: 'TEST_PKG4',
        weight: 80,
        distance: 100,
      },
      {
        id: 'TEST_PKG2',
        weight: 80,
        distance: 125,
      },
    ];

    const sortedPackages = sortPackages(packages);

    expect(sortedPackages).toEqual(expectedPackages);
  });

  it('should sort packages in the order of weight: desc, distance: asc, id: asc', () => {
    const packages: Package[] = [
      {
        id: 'TEST_PKG1',
        weight: 50,
        distance: 100,
      },
      {
        id: 'TEST_PKG2',
        weight: 75,
        distance: 125,
      },
      {
        id: 'TEST_PKG3',
        weight: 50,
        distance: 30,
      },
      {
        id: 'TEST_PKG4',
        weight: 150,
        distance: 40,
      },
      {
        id: 'TEST_PKG5',
        weight: 75,
        distance: 80,
      },
      {
        id: 'TEST_PKG6',
        weight: 50,
        distance: 100,
      },
    ];

    const expectedPackages = [
      {
        id: 'TEST_PKG4',
        weight: 150,
        distance: 40,
      },
      {
        id: 'TEST_PKG5',
        weight: 75,
        distance: 80,
      },
      {
        id: 'TEST_PKG2',
        weight: 75,
        distance: 125,
      },
      {
        id: 'TEST_PKG3',
        weight: 50,
        distance: 30,
      },
      {
        id: 'TEST_PKG1',
        weight: 50,
        distance: 100,
      },
      {
        id: 'TEST_PKG6',
        weight: 50,
        distance: 100,
      },
    ];

    const sortedPackages = sortPackages(packages);

    expect(sortedPackages).toEqual(expectedPackages);
  });
});

describe('simulatePackVehicle()', () => {
  it('should simulate possible vehicle packing scenarios: 5 packages (Step 01)', () => {
    const vehicle: Vehicle = {
      maxSpeed: 50,
      maxWeight: 200,
    };

    const results = simulatePackVehicle(vehicle, mockPackages);

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
    const vehicle: Vehicle = {
      maxSpeed: 50,
      maxWeight: 200,
    };

    const packages = mockPackages.filter((pkg) =>
      ['PKG1', 'PKG3', 'PKG5'].includes(pkg.id)
    );

    const results = simulatePackVehicle(vehicle, packages);

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
    const vehicle: Vehicle = {
      maxSpeed: 50,
      maxWeight: 200,
    };

    const packages = mockPackages.filter((pkg) =>
      ['PKG1', 'PKG5'].includes(pkg.id)
    );

    const results = simulatePackVehicle(vehicle, packages);

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
    const vehicle: Vehicle = {
      maxSpeed: 50,
      maxWeight: 200,
    };

    const packages = mockPackages.filter((pkg) => pkg.id === 'PKG1');

    const results = simulatePackVehicle(vehicle, packages);

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
