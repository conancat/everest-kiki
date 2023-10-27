import { Offer } from '../offer';
import { Package } from '../package';

describe('new Offer()', () => {
  it('should return an Offer object when given required parameters', () => {
    const offer = new Offer({
      id: 'OFR001',
      percent: 10,
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
    expect(offer.percent).toBe(10);
    expect(offer.distance.min).toBe(0);
    expect(offer.distance.max).toBe(200);
    expect(offer.weight.min).toBe(70);
    expect(offer.weight.max).toBe(200);
  });
});

describe('Offer.prototype.test(pkg)', () => {
  type TestCase = [boolean, number, number];
  const testCases: TestCase[] = [
    [true, 100, 150],
    [false, 100, 50],
    [false, 100, 300],
    [false, 50, 200],
    [false, 250, 100],
  ];

  it.each(testCases)(
    'should return %s if a Package has weight %s and distance %s',
    (expected: boolean, weight: number, distance: number) => {
      const offer = new Offer({
        id: 'OFR001',
        percent: 10,
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
        weight,
        distance,
      });

      const test: boolean = offer.test(pkg);

      expect(test).toBe(expected);
    }
  );
});

describe('Offer.prototype.calculate(pkg)', () => {
  it("should calculate discount amount for Package that matches the Offer's conditions", () => {
    const offer = new Offer({
      id: 'OFR003',
      percent: 5,
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

    const percent = offer.calculate(pkg);

    expect(percent).toBe(35);
  });
});
