import { getNextAvailableVehicle } from '../utils';
import { Package, PackageProps, createPackage } from './package';
import Shipment from './shipment';
import { Vehicle } from './vehicle';

interface Order {
  packages: Package[];
  shipments: Shipment[];
  weight: number;
  distance: number;
  totalDiscount: number;
  totalDeliveryCost: number;
  plan(vehicles: Vehicle[]): Order;
  calculate(): Order;
}

type OrderProps = {
  packages: PackageProps[];
  baseCost: number;
};

class Order implements Order {
  shipments: Shipment[] = [];

  constructor(props: OrderProps) {
    this.packages = props.packages.map((pkg) =>
      createPackage({ ...pkg, baseCost: props.baseCost })
    );
  }
  plan(vehicles: Vehicle[]): Order {
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

  calculate(): Order {
    this.packages.forEach((pkg) => pkg.calculate());

    this.totalDeliveryCost = this.packages.reduce(
      (total, pkg) => total + pkg.deliveryCost,
      0
    );

    this.totalDiscount = this.packages.reduce(
      (total, pkg) => total + pkg.discount,
      0
    );

    return this;
  }
}

export const createOrder = (props: OrderProps): Order => new Order(props);
