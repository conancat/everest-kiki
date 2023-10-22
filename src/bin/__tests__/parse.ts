import {
  parseOrderInput,
  parsePackageInput,
  parseVehicleInput,
} from '../parse';

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
