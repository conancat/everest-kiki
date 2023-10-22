import { getOffer } from '../repositories/offer';
import { Offer } from './offer';
import { Vehicle } from './vehicle';

export interface Package {
  id: string;
  weight: number;
  distance: number;
  deliveryCost: number;
  discount: number;
  totalCost: number;
  offer?: Offer;
  offerCode?: string;
  vehicle?: Vehicle;
  deliveryTime?: number;
  finalDeliveryTime?: number;
  setVehicle(vehicle: Vehicle): Package;
  setDeliveryTime(time: number): Package;
  setfinalDeliveryTime(time: number): Package;
}

export type PackageProps = {
  id: string;
  weight: number;
  distance: number;
  baseCost?: number;
  offerCode?: string;
};

export type PackagesProps = {
  baseCost: number;
};

export class Package implements Package {
  #baseCost: number = 0;

  constructor(props: PackageProps) {
    this.id = props.id;
    this.weight = props.weight;
    this.distance = props.distance;
    this.offerCode = props.offerCode;
    this.#baseCost = props.baseCost ?? 0;
  }

  calculate(): number {
    this.totalCost = this.calculateDeliveryCost() - this.calculateDiscount();
    return this.totalCost;
  }

  calculateDeliveryCost(): number {
    this.deliveryCost = this.#baseCost + this.weight * 10 + this.distance * 5;
    return this.deliveryCost;
  }

  calculateDiscount(): number {
    this.discount = 0;

    if (!this.offerCode) {
      return this.discount;
    }

    const offer = getOffer(this.offerCode);

    if (!offer) {
      return this.discount;
    }

    if (offer.test(this)) {
      this.offer = offer;
      this.discount = offer.calculate(this);
    }

    return this.discount;
  }

  setVehicle(vehicle: Vehicle): this {
    this.vehicle = vehicle;
    return this;
  }
  setDeliveryTime(time: number): this {
    this.deliveryTime = time;
    return this;
  }
  setfinalDeliveryTime(time: number): this {
    this.finalDeliveryTime = time;
    return this;
  }
}

export const createPackage = (props: PackageProps): Package =>
  new Package(props);
