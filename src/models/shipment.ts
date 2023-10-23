import { sortPackages } from '../utils';
import { Package } from './package';
import { Vehicle } from './vehicle';

export type ShipmentProps = {
  packages: Package[];
  totalWeight: number;
  totalDistance: number;
  totalCost: number;
  vehicle: Vehicle;
};

type ShipmentScenario = {
  packages: Package[];
  totalWeight: number;
  totalDistance: number;
  totalCost: number;
};

type ShipmentScenarios = ShipmentScenario[];

type ShipmentPlan = {
  shipment: Shipment;
  remainingPackages: Package[];
};

export class Shipment {
  packages: Package[] = [];
  totalWeight: number = 0;
  totalCost: number = 0;
  totalDistance: number = 0;
  vehicle: Vehicle;

  constructor(props: ShipmentProps) {
    this.packages = props.packages;
    this.totalWeight = props.totalWeight;
    this.totalCost = props.totalCost;
    this.totalDistance = props.totalDistance;
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
        totalDistance: 0,
        totalCost: 0,
      };

      let remainingWeight = vehicle.maxWeight;

      for (const pkg of sortedPackages) {
        if (remainingWeight - pkg.weight >= 0) {
          scenario.packages.push(pkg);
          scenario.totalWeight += pkg.weight;
          scenario.totalCost += pkg.totalCost ?? 0;
          scenario.totalDistance += pkg.distance ?? 0;
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
    const scenarios = Shipment.simulate(structuredClone(packages), vehicle);

    const bestScenario = Shipment.findBestScenario(scenarios);

    const plan = {
      shipment: new Shipment({
        ...bestScenario,
        packages: packages.filter((pkg) =>
          bestScenario.packages.map((p) => p.id).includes(pkg.id)
        ),
        vehicle,
      }),
      remainingPackages: packages.filter(
        (pkg) => !bestScenario.packages.map((p) => p.id).includes(pkg.id)
      ),
    };

    return plan;
  }
}

export default Shipment;
