import { Package } from './package';

export type VehicleProps = {
  id: string;
  maxSpeed: number;
  maxWeight: number;
};

export class Vehicle {
  id: string;
  maxSpeed: number = 0;
  maxWeight: number = 0;
  totalTravelTime: number = 0;
  packages: Package[] = [];
  deliveries: Package[][] = [];

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
  calculateArrivalTime(pkg: Package) {
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
        .setArrivalTime(this.calculateArrivalTime(pkg))
    );

    const maxDeliveryTime = deliveryPackages
      .map((pkg) => pkg.deliveryTime)
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
