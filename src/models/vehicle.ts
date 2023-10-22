import { Package } from './package';

export interface Vehicle {
  id: string;
  maxSpeed: number;
  maxWeight: number;
  totalTravelTime: number;
  packages: Package[];
  deliveries: Package[][];
  calculateDeliveryTime(pkg: Package): number;
  calculatefinalDeliveryTime(pkgs: Package): number;
  deliverPackages(pkgs: Package[]): Vehicle;
}

export type VehicleProps = {
  id: string;
  maxSpeed: number;
  maxWeight: number;
};

export class Vehicle implements Vehicle {
  packages: Package[] = [];
  deliveries: Package[][] = [];
  totalTravelTime: number = 0;

  constructor(props: VehicleProps) {
    this.id = props.id;
    this.maxSpeed = props.maxSpeed;
    this.maxWeight = props.maxWeight;
  }

  calculateDeliveryTime(pkg: Package) {
    return (
      Math.floor((pkg.distance / this.maxSpeed + Number.EPSILON) * 100) / 100
    );
  }
  calculatefinalDeliveryTime(pkg: Package) {
    return (
      Math.floor(
        (pkg.distance / this.maxSpeed + this.totalTravelTime + Number.EPSILON) *
          100
      ) / 100
    );
  }

  deliverPackages(pkgs: Package[]) {
    const deliveryPackages = pkgs.map((pkg) =>
      pkg
        .setDeliveryTime(this.calculateDeliveryTime(pkg))
        .setfinalDeliveryTime(this.calculatefinalDeliveryTime(pkg))
    );

    const maxDeliveryTime = deliveryPackages
      .map((pkg) => pkg.deliveryTime as number)
      .sort((a, b) => b - a)[0];

    this.packages = this.packages.concat(deliveryPackages);
    this.deliveries = this.deliveries.concat([deliveryPackages]);
    this.totalTravelTime = this.totalTravelTime + maxDeliveryTime * 2;

    return this;
  }
}

export const createVehicle = ({
  id,
  maxSpeed,
  maxWeight,
}: VehicleProps): Vehicle => new Vehicle({ id, maxSpeed, maxWeight });
