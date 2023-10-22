import { Package, createPackage } from '../models/package';
import mockPackages from '../__mocks__/packages.json';
import { sortPackages } from '../utils';
import { Vehicle, createVehicle } from '../models/vehicle';

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
    ].map(createPackage);

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
    ].map(createPackage);

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
    ].map(createPackage);

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
    ].map(createPackage);

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
    ].map(createPackage);

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
    ].map(createPackage);

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
    ].map(createPackage);

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
