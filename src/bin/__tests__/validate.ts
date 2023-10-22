import schemas from '../schemas';

import { validateInput, validatePackageInput } from '../validate';

describe('validateInput()', () => {
  it('should validate input when given correct input', () => {
    expect(validateInput('100', schemas.BaseCostInputSchema)).toBe(true);
  });

  it('should throw error when given an empty input', () => {
    expect(validateInput('', schemas.BaseCostInputSchema)).toBe(
      'Please enter a valid input.'
    );
  });

  describe('Order options', () => {
    it('should throw error when given invalid baseCost input', () => {
      expect(validateInput('meh', schemas.BaseCostInputSchema)).toBe(
        'Base cost must be a number.'
      );
    });

    it('should throw error when baseCost is negative value', () => {
      expect(validateInput('-1', schemas.BaseCostInputSchema)).toBe(
        'Base cost must be a positive number.'
      );
    });

    it('should throw error when given invalid packagesCount input', () => {
      expect(validateInput('lol', schemas.PackagesCountInputSchema)).toBe(
        'Packages count must be an integer.'
      );
    });

    it('should throw error when packagesCount is negative value', () => {
      expect(validateInput('-1', schemas.PackagesCountInputSchema)).toBe(
        'Packages count must be a positive integer.'
      );
    });
  });

  describe('Vehicles options', () => {
    it('should throw error when given invalid vehicle count', () => {
      expect(validateInput('lol', schemas.VehiclesCountInputSchema)).toBe(
        'Vehicles count must be an integer.'
      );
    });

    it('should throw error when packagesCount is negative value', () => {
      expect(validateInput('-1', schemas.VehiclesCountInputSchema)).toBe(
        'Vehicles count must be a positive integer.'
      );
    });

    it('should throw error when given invalid maxSpeed', () => {
      expect(validateInput('lol', schemas.VehiclesMaxSpeedInputSchema)).toBe(
        'Max speed must be an integer.'
      );
    });

    it('should throw error when given invalid maxWeight', () => {
      expect(validateInput('lol', schemas.VehiclesMaxWeightInputSchema)).toBe(
        'Max weight must be an integer.'
      );
    });
  });
});

describe('validatePackageInput()', () => {
  it('should validate package input when given correct input without offer code', () => {
    expect(validatePackageInput('PKG1 10 100')).toBe(true);
  });

  it('should validate package input when given correct input with offer code', () => {
    expect(validatePackageInput('PKG1 10 100 OFR003')).toBe(true);
  });

  it('should throw error when given an empty input', () => {
    expect(validatePackageInput('')).toBe('Please enter a valid input.');
  });

  it('should throw error when given invalid package ID', () => {
    expect(validatePackageInput('PKG!! 10 100')).toBe(
      'id: Package ID must be alphanumeric.'
    );
  });

  it('should throw error when given invalid package weight', () => {
    expect(validatePackageInput('PKG1 10mh 100')).toBe(
      'weight: Package weight must be an integer.'
    );
  });

  it('should throw error when given invalid package distance', () => {
    expect(validatePackageInput('PKG1 10 1so')).toBe(
      'distance: Package distance must be an integer.'
    );
  });
});
