import { Package } from './package';

type Range = {
  min: number;
  max: number;
};

export interface Offer {
  id: string;
  discount: number;
  distance: Range;
  weight: Range;
}

export type OfferProps = {
  id: string;
  discount: number;
  distance: Range;
  weight: Range;
};

export class Offer implements Offer {
  constructor(props: OfferProps) {
    this.id = props.id;
    this.discount = props.discount;
    this.distance = props.distance;
    this.weight = props.weight;
  }
  test(pkg: Package): boolean {
    return (
      pkg.distance >= this.distance.min &&
      pkg.distance <= this.distance.max &&
      pkg.weight >= this.weight.min &&
      pkg.weight <= this.weight.max
    );
  }

  calculate(pkg: Package): number {
    const discount =
      (Math.floor(pkg.deliveryCost * (this.discount / 100) + Number.EPSILON) *
        100) /
      100;
    return discount;
  }
}
