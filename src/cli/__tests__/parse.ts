import {
  parseInput,
  parseOrderInput,
  parsePackageInput,
  parseVehicleInput,
} from '../parse';

import schemas from '../schemas';

describe('parseInput()', () => {
  it('should parse input when given correct schema and input', () => {
    expect(parseInput(schemas.BaseCostInputSchema)('100')).toBe(100);
  });

  it('should parse input when given correct schema and input with keys', () => {
    expect(
      parseInput(schemas.OrderInputSchema, ['baseCost', 'packagesCount'])(
        '100 5'
      )
    ).toEqual({
      baseCost: 100,
      packagesCount: 5,
    });
  });
});

describe('parseBaseCostInput()', () => {
  it('should parse base cost input when given correct input', () => {
    expect(parseInput(schemas.BaseCostInputSchema)('100')).toBe(100);
  });
});

describe('parsePackagesCountInput()', () => {
  it('should parse packages count input when given correct input', () => {
    expect(parseInput(schemas.PackagesCountInputSchema)('5')).toBe(5);
  });
});

describe('parseVehiclesCountInput()', () => {
  it('should parse vehicles count input when given correct input', () => {
    expect(parseInput(schemas.VehiclesCountInputSchema)('3')).toBe(3);
  });
});

describe('parseVehiclesMaxSpeedInput()', () => {
  it('should parse vehicles max speed input when given correct input', () => {
    expect(parseInput(schemas.VehiclesMaxSpeedInputSchema)('100')).toBe(100);
  });
});

describe('parseVehiclesMaxWeightInput()', () => {
  it('should parse vehicles max weight input when given correct input', () => {
    expect(parseInput(schemas.VehiclesMaxWeightInputSchema)('10')).toBe(10);
  });
});

describe('parseOrderInput()', () => {
  it('should parse order input when given correct input', () => {
    expect(parseOrderInput('100 5')).toEqual({
      baseCost: 100,
      packagesCount: 5,
    });
  });
});

describe('parsePackageInput()', () => {
  it('should parse package input when given input without offer code', () => {
    expect(parsePackageInput('PKG1 10 100')).toEqual({
      id: 'PKG1',
      weight: 10,
      distance: 100,
    });
  });

  it('should parse package input when given input with offer code', () => {
    expect(parsePackageInput('PKG1 10 100 OFR003')).toEqual({
      id: 'PKG1',
      weight: 10,
      distance: 100,
      offerCode: 'OFR003',
    });
  });
});

describe('parseVehicleInput()', () => {
  it('should parse vehicle input when given correct input', () => {
    expect(parseVehicleInput('3 100 10')).toEqual({
      count: 3,
      maxSpeed: 100,
      maxWeight: 10,
    });
  });
});
