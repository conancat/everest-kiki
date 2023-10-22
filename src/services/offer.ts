import { Offer } from '../models/offer';
import offers from './offers.json';

export const getOffer = (offerCode: string) => {
  const offer = offers.find((offer) => offer.id === offerCode);
  if (!offer) return null;
  return new Offer(offer);
};
