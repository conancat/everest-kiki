import {
  validateBaseCostInput,
  validatePackagesCountInput,
  validateVehiclesCountInput,
  validateVehiclesMaxSpeedInput,
  validateVehiclesMaxWeightInput,
  validatePackageInput,
} from '../validate';

describe('validateInput()', () => {
  it('should validate input when given correct input', () => {
    expect(validateBaseCostInput('100')).toBe(true);
  });

  it('should throw error when given an empty input', () => {
    expect(validatePackagesCountInput('')).toBe('Please enter a valid input.');
  });

  describe('Order options', () => {
    it('should throw error when given invalid baseCost input', () => {
      expect(validateBaseCostInput('what')).toBe('Base cost must be a number.');
    });

    it('should throw error when baseCost is negative value', () => {
      expect(validateBaseCostInput('-1')).toBe(
        'Base cost must be a positive number.'
      );
    });

    it('should throw error when given invalid packagesCount input', () => {
      expect(validatePackagesCountInput('lol')).toBe(
        'Packages count must be an integer.'
      );
    });

    it('should throw error when packagesCount is negative value', () => {
      expect(validatePackagesCountInput('-20')).toBe(
        'Packages count must be a positive integer.'
      );
    });
  });

  describe('Vehicles options', () => {
    it('should throw error when given invalid vehicle count', () => {
      expect(validateVehiclesCountInput('lol')).toBe(
        'Vehicles count must be an integer.'
      );
    });

    it('should throw error when packagesCount is negative value', () => {
      expect(validateVehiclesCountInput('-29')).toBe(
        'Vehicles count must be a positive integer.'
      );
    });

    it('should throw error when given invalid maxSpeed', () => {
      expect(validateVehiclesMaxSpeedInput('huh')).toBe(
        'Max speed must be an integer.'
      );
    });

    it('should throw error when maxSpeed is negative value', () => {
      expect(validateVehiclesMaxSpeedInput('-23')).toBe(
        'Max speed must be a positive integer.'
      );
    });

    it('should throw error when given invalid maxWeight', () => {
      expect(validateVehiclesMaxWeightInput('wow')).toBe(
        'Max weight must be an integer.'
      );
    });

    it('should throw error when maxWeight is negative value', () => {
      expect(validateVehiclesMaxWeightInput('-34')).toBe(
        'Max weight must be a positive integer.'
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
