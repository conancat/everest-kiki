import { Package, createPackage } from '../package';

describe('createPackage()', () => {
  it('should create a Package object without offer code', () => {
    const pkg = createPackage({
      id: 'PKG1',
      weight: 50,
      distance: 100,
    });

    expect(pkg instanceof Package).toBe(true);

    expect(pkg.id).toBe('PKG1');
    expect(pkg.weight).toBe(50);
    expect(pkg.distance).toBe(100);
    expect(pkg.offerCode).toBeUndefined();
  });

  it('should create a Package object with offer code', () => {
    const pkg = createPackage({
      id: 'PKG1',
      weight: 50,
      distance: 100,
      offerCode: 'OFR001',
    });

    expect(pkg instanceof Package).toBe(true);

    expect(pkg.id).toBe('PKG1');
    expect(pkg.weight).toBe(50);
    expect(pkg.distance).toBe(100);
    expect(pkg.offerCode).toBe('OFR001');
  });
});

describe('Package.prototype.setDeliveryTime()', () => {
  it('should set the deliveryTime property of a Package object', () => {
    const pkg = createPackage({
      id: 'PKG1',
      weight: 50,
      distance: 100,
    });

    pkg.setDeliveryTime(1.78);

    expect(pkg.deliveryTime).toBe(1.78);
  });
});

describe('Package.prototype.calculateDeliveryCost()', () => {
  it('should calculate delivery cost of Package object: PKG1', () => {
    const pkg = createPackage({
      id: 'PKG1',
      weight: 5,
      distance: 5,
      baseCost: 100,
      offerCode: 'OFR001',
    });

    const cost = pkg.calculateDeliveryCost();

    expect(cost).toBe(175);
  });

  it('should calculate delivery cost of Package object: PKG2', () => {
    const pkg = createPackage({
      id: 'PKG2',
      weight: 15,
      distance: 5,
      baseCost: 100,
      offerCode: 'OFR002',
    });

    const cost = pkg.calculateDeliveryCost();

    expect(cost).toBe(275);
  });

  it('should calculate delivery cost of Package object: PKG3', () => {
    const pkg = createPackage({
      id: 'PKG3',
      weight: 10,
      distance: 100,
      baseCost: 100,
      offerCode: 'OFR003',
    });

    const cost = pkg.calculateDeliveryCost();

    expect(cost).toBe(700);
  });
});

describe('Package.prototype.calculateDiscount()', () => {
  it('should calculate discount of Package object: PKG1', () => {
    const pkg = createPackage({
      id: 'PKG1',
      weight: 5,
      distance: 5,
      baseCost: 100,
      offerCode: 'OFR001',
    });

    pkg.calculateDeliveryCost();
    const cost = pkg.calculateDiscount();

    expect(cost).toBe(0);
  });

  it('should calculate discount of Package object: PKG2', () => {
    const pkg = createPackage({
      id: 'PKG2',
      weight: 15,
      distance: 5,
      baseCost: 100,
      offerCode: 'OFR002',
    });

    pkg.calculateDeliveryCost();
    const cost = pkg.calculateDiscount();

    expect(cost).toBe(0);
  });

  it('should calculate discount of Package object: PKG3', () => {
    const pkg = createPackage({
      id: 'PKG3',
      weight: 10,
      distance: 100,
      baseCost: 100,
      offerCode: 'OFR003',
    });

    pkg.calculateDeliveryCost();
    const cost = pkg.calculateDiscount();

    expect(cost).toBe(35);
  });
});

describe('Package.prototype.calculate()', () => {
  it('should calculate total cost of Package object: PKG1', () => {
    const pkg = createPackage({
      id: 'PKG1',
      weight: 5,
      distance: 5,
      baseCost: 100,
      offerCode: 'OFR001',
    });

    const cost = pkg.calculate();

    expect(cost).toBe(175);
  });

  it('should calculate total cost of Package object: PKG2', () => {
    const pkg = createPackage({
      id: 'PKG2',
      weight: 15,
      distance: 5,
      baseCost: 100,
      offerCode: 'OFR002',
    });

    const cost = pkg.calculate();

    expect(cost).toBe(275);
  });

  it('should calculate total cost of Package object: PKG3', () => {
    const pkg = createPackage({
      id: 'PKG3',
      weight: 10,
      distance: 100,
      baseCost: 100,
      offerCode: 'OFR003',
    });

    const cost = pkg.calculate();

    expect(cost).toBe(665);
  });
});
