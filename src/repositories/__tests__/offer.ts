import { Offer } from '../../models/offer';
import { getOffer } from '../offer';

describe('getOffer()', () => {
  it('should return an offer object when given the offer code as a string', () => {
    const offer = getOffer('OFR001');

    if (offer === null) throw new Error('Offer not found');

    expect(offer instanceof Offer).toBe(true);

    expect(offer.id).toBe('OFR001');
    expect(offer.discount).toBe(10);
    expect(offer.distance.min).toBe(0);
    expect(offer.distance.max).toBe(200);
    expect(offer.weight.min).toBe(70);
    expect(offer.weight.max).toBe(200);
  });

  it('should throw an error if the offer code is not found', () => {
    expect(getOffer('OFR999')).toBe(null);
  });
});
