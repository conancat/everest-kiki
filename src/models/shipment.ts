import { sortPackages } from '../utils';
import { Package } from './package';
import { Vehicle } from './vehicle';

export type ShipmentProps = {
  packages: Package[];
  totalWeight: number;
  vehicle: Vehicle;
};

type ShipmentScenario = {
  packages: Package[];
  totalWeight: number;
};

type ShipmentScenarios = ShipmentScenario[];

type ShipmentPlan = {
  shipment: Shipment;
  remainingPackages: Package[];
};

export interface Shipment {
  packages: Package[];
  vehicle: Vehicle;
  totalWeight: number;
  totalCost: number;
  finalDeliveryTime: number;
  simulate(packages: Package[], vehicle: Vehicle): ShipmentScenarios;
  plan(packages: Package[]): ShipmentPlan;
}

export class Shipment implements Shipment {
  constructor(props: ShipmentProps) {
    this.packages = props.packages;
    this.totalWeight = props.totalWeight;
    this.vehicle = props.vehicle;
  }

  commit() {
    this.vehicle.deliverPackages(this.packages);
    return this;
  }

  static simulate(packages: Package[], vehicle: Vehicle) {
    const scenarios: ShipmentScenarios = [];

    const simulate = (vehicle: Vehicle, packages: Package[]) => {
      if (packages.length === 0) {
        return scenarios;
      }

      const sortedPackages = sortPackages(packages);

      const scenario: ShipmentScenario = {
        packages: [],
        totalWeight: 0,
      };

      let remainingWeight = vehicle.maxWeight;

      for (const pkg of sortedPackages) {
        if (remainingWeight - pkg.weight >= 0) {
          scenario.packages.push(pkg);
          scenario.totalWeight += pkg.weight;
          remainingWeight -= pkg.weight;
        }
      }

      scenarios.push(scenario);

      const nextPackage = sortedPackages.shift();

      if (nextPackage) {
        simulate(vehicle, sortedPackages);
      }
    };

    simulate(vehicle, packages);

    return scenarios;
  }

  private static sortScenarios(scenarios: ShipmentScenarios) {
    return scenarios.sort((a, b) => {
      if (a.totalWeight > b.totalWeight) {
        return -1;
      } else if (a.totalWeight < b.totalWeight) {
        return 1;
      }
      return 0;
    });
  }

  private static findBestScenario(scenarios: ShipmentScenarios) {
    return Shipment.sortScenarios(scenarios)[0];
  }

  static plan(packages: Package[], vehicle: Vehicle): ShipmentPlan {
    const scenarios = Shipment.simulate(packages, vehicle);

    const bestScenario = Shipment.findBestScenario(scenarios);

    const plan = {
      shipment: new Shipment({ ...bestScenario, vehicle }),
      remainingPackages: packages.filter(
        (pkg) => !scenarios[0].packages.map((p) => p.id).includes(pkg.id)
      ),
    };

    return plan;
  }
}

export default Shipment;
