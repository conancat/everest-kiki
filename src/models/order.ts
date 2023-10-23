import { getNextAvailableVehicle } from '../utils';
import { Package, PackageProps, createPackage } from './package';
import Shipment from './shipment';
import { Vehicle } from './vehicle';

export type OrderProps = {
  packages: PackageProps[];
  baseCost: number;
};

export class Order {
  shipments: Shipment[] = [];
  baseCost: number = 0;
  totalDeliveryCost: number = 0;
  totalWeight: number = 0;
  totalDiscount: number = 0;
  totalDistance: number = 0;
  finalCost: number = 0;
  packages: Package[] = [];

  constructor(props: OrderProps) {
    this.baseCost = props.baseCost;
    this.packages = props.packages.map((pkg) =>
      createPackage({ ...pkg, baseCost: props.baseCost })
    );
  }
  plan(vehicles: Vehicle[]): this {
    let remainingPackages = this.packages;

    while (remainingPackages.length > 0) {
      const vehicle = getNextAvailableVehicle(vehicles);
      const plan = Shipment.plan(remainingPackages, vehicle);
      plan.shipment.commit();

      remainingPackages = plan.remainingPackages;

      this.shipments.push(plan.shipment);
    }

    return this;
  }

  private sumPackagesByAttribute(
    attribute: 'weight' | 'distance' | 'deliveryCost' | 'discount'
  ): number {
    return this.packages.reduce((total, pkg) => total + pkg[attribute], 0);
  }

  calculate(): this {
    this.packages.forEach((pkg) => pkg.calculate());

    this.totalWeight = this.sumPackagesByAttribute('weight');
    this.totalDistance = this.sumPackagesByAttribute('distance');
    this.totalDeliveryCost = this.sumPackagesByAttribute('deliveryCost');
    this.totalDiscount = this.sumPackagesByAttribute('discount');
    this.finalCost = this.totalDeliveryCost - this.totalDiscount;

    return this;
  }
}

export const createOrder = (props: OrderProps): Order => new Order(props);

export default Order;
