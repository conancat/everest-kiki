import { Offer } from '../offer';
import { Package } from '../package';

describe('Offer constructor', () => {
  it('should return an Offer object when given required parameters', () => {
    const offer = new Offer({
      id: 'OFR001',
      discount: 10,
      distance: {
        min: 0,
        max: 200,
      },
      weight: {
        min: 70,
        max: 200,
      },
    });

    expect(offer instanceof Offer).toBe(true);
    expect(offer.id).toBe('OFR001');
    expect(offer.discount).toBe(10);
    expect(offer.distance.min).toBe(0);
    expect(offer.distance.max).toBe(200);
    expect(offer.weight.min).toBe(70);
    expect(offer.weight.max).toBe(200);
  });
});

describe('offer.test(pkg)', () => {
  it('should return true if an Offer can be applied to a Package', () => {
    const offer = new Offer({
      id: 'OFR001',
      discount: 10,
      distance: {
        min: 0,
        max: 200,
      },
      weight: {
        min: 70,
        max: 200,
      },
    });

    const pkg = new Package({
      id: 'PKG001',
      weight: 100,
      distance: 150,
    });

    const test: boolean = offer.test(pkg);

    expect(test).toBe(true);
  });

  it("should return false if a Package's distance is below Offer's allowed range", () => {
    const offer = new Offer({
      id: 'OFR001',
      discount: 10,
      distance: {
        min: 100,
        max: 200,
      },
      weight: {
        min: 70,
        max: 200,
      },
    });

    const pkg = new Package({
      id: 'PKG001',
      weight: 100,
      distance: 50,
    });

    const test: boolean = offer.test(pkg);

    expect(test).toBe(false);
  });

  it("should return false if a Package's distance is above Offer's allowed range", () => {
    const offer = new Offer({
      id: 'OFR001',
      discount: 10,
      distance: {
        min: 0,
        max: 200,
      },
      weight: {
        min: 70,
        max: 200,
      },
    });

    const pkg = new Package({
      id: 'PKG001',
      weight: 100,
      distance: 300,
    });

    const test: boolean = offer.test(pkg);

    expect(test).toBe(false);
  });

  it("should return false if a Package's weight is below Offer's allowed range", () => {
    const offer = new Offer({
      id: 'OFR001',
      discount: 10,
      distance: {
        min: 0,
        max: 200,
      },
      weight: {
        min: 70,
        max: 200,
      },
    });

    const pkg = new Package({
      id: 'PKG001',
      weight: 30,
      distance: 100,
    });

    const test: boolean = offer.test(pkg);

    expect(test).toBe(false);
  });

  it("should return false if a Package's weight is above Offer's allowed range", () => {
    const offer = new Offer({
      id: 'OFR001',
      discount: 10,
      distance: {
        min: 0,
        max: 200,
      },
      weight: {
        min: 70,
        max: 200,
      },
    });

    const pkg = new Package({
      id: 'PKG001',
      weight: 250,
      distance: 100,
    });

    const test: boolean = offer.test(pkg);

    expect(test).toBe(false);
  });
});

describe('offer.calculate(pkg)', () => {
  it("should calculate discount amount for Package that matches the Offer's conditions", () => {
    const offer = new Offer({
      id: 'OFR003',
      discount: 5,
      distance: {
        min: 50,
        max: 250,
      },
      weight: {
        min: 10,
        max: 150,
      },
    });

    const pkg = new Package({
      id: 'OFR003',
      weight: 10,
      distance: 100,
      baseCost: 100,
    });

    pkg.calculate();

    const discount = offer.calculate(pkg);

    expect(discount).toBe(35);
  });
});
