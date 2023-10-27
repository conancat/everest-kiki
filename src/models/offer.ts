import { Package } from './package';

type Range = {
  min: number;
  max: number;
};

export type OfferProps = {
  id: string;
  percent: number;
  distance: Range;
  weight: Range;
};

export class Offer {
  id: string;
  percent: number = 0;
  distance: Range;
  weight: Range;

  constructor(props: OfferProps) {
    this.id = props.id;
    this.percent = props.percent;
    this.distance = props.distance;
    this.weight = props.weight;
  }
  canApplyToPackage(pkg: Package): boolean {
    return (
      pkg.distance >= this.distance.min &&
      pkg.distance <= this.distance.max &&
      pkg.weight >= this.weight.min &&
      pkg.weight <= this.weight.max
    );
  }

  calculate(pkg: Package): number {
    const percent =
      (Math.floor(pkg.deliveryCost * (this.percent / 100) + Number.EPSILON) *
        100) /
      100;
    return percent;
  }
}
