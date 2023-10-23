import { input, confirm } from '@inquirer/prompts';

import Table from 'cli-table3';

import {
  validateBaseCostInput,
  validatePackageInput,
  validatePackagesCountInput,
  validateVehiclesCountInput,
  validateVehiclesMaxSpeedInput,
  validateVehiclesMaxWeightInput,
} from './validate';

import {
  parseBaseCostInput,
  parsePackageInput,
  parsePackagesCountInput,
  parseVehiclesCountInput,
  parseVehiclesMaxSpeedInput,
  parseVehiclesMaxWeightInput,
} from './parse';
import { PackageProps } from '../models/package';

type PromptOptions = {
  baseCost?: number;
  packagesCount?: number;
  vehiclesCount?: number;
  vehiclesMaxSpeed?: number;
  vehiclesMaxWeight?: number;
};

type PromptOneOptions = {
  key: string;
  message: string;
  validate: (input: string) => boolean | string;
  parse: (input: string) => any;
};

export type Options = {
  order: {
    baseCost: number;
    packagesCount: number;
  };
  packages: PackageProps[];
  vehicles: {
    vehiclesCount: number;
    vehiclesMaxSpeed: number;
    vehiclesMaxWeight: number;
  };
};

export type PromptResult = {
  confirm: boolean;
  options: Options;
};

const askFor = async (options: PromptOneOptions) => {
  const results = await input({
    message: options.message,
    validate: options.validate,
  });

  return options.parse(results);
};

const promptPackagesInput = async (count: number) => {
  const packages: any[] = [];

  for (let i = 0; i < count; i++) {
    const result = await input({
      message: `📦 Enter package ${
        i + 1
      } details [<id> <weight> <distance> [offerCode]]:`,
      validate: validatePackageInput,
    });

    packages.push(parsePackageInput(result));
  }
  return packages;
};

export const prompt = async (
  promptOptions: PromptOptions = {}
): Promise<PromptResult> => {
  const order = {
    baseCost:
      promptOptions.baseCost ||
      (await askFor({
        key: 'baseCost',
        message: '🧾 Enter order base cost [baseCost]: ',
        validate: validateBaseCostInput,
        parse: parseBaseCostInput,
      })),
    packagesCount:
      promptOptions.packagesCount ||
      (await askFor({
        key: 'packagesCount',
        message: '🧾 Enter order packages count [packagesCount]: ',
        validate: validatePackagesCountInput,
        parse: parsePackagesCountInput,
      })),
  };

  const packages = await promptPackagesInput(order.packagesCount);

  const vehicles = {
    vehiclesCount:
      promptOptions.vehiclesCount ||
      (await askFor({
        key: 'vehiclesCount',
        message: '🛵 Enter vehicles count [vehiclesCount]: ',
        validate: validateVehiclesCountInput,
        parse: parseVehiclesCountInput,
      })),
    vehiclesMaxSpeed:
      promptOptions.vehiclesMaxSpeed ||
      (await askFor({
        key: 'vehiclesMaxSpeed',
        message: '🛵 Enter vehicles max speed [vehiclesMaxSpeed]: ',
        validate: validateVehiclesMaxSpeedInput,
        parse: parseVehiclesMaxSpeedInput,
      })),
    vehiclesMaxWeight:
      promptOptions.vehiclesMaxWeight ||
      (await askFor({
        key: 'vehiclesMaxWeight',
        message: '🛵 Enter vehicles max weight [vehiclesMaxWeight]: ',
        validate: validateVehiclesMaxWeightInput,
        parse: parseVehiclesMaxWeightInput,
      })),
  };

  const options = {
    order,
    packages,
    vehicles,
  };

  const orderOptionsTable = new Table({
    head: ['Base Cost', 'Packages Count'],
    style: { head: ['cyan'] },
  });
  orderOptionsTable.push([order.baseCost, order.packagesCount]);

  const packagesTable = new Table({
    head: ['ID', 'Weight', 'Distance', 'Offer Code'],
    style: { head: ['cyan'] },
  });

  packages.forEach((pkg) => {
    packagesTable.push([
      pkg.id,
      pkg.weight,
      pkg.distance,
      pkg.offerCode || '-',
    ]);
  });

  const vehiclesOptionsTable = new Table({
    head: ['Count', 'Max Speed', 'Max Weight'],
    style: { head: ['cyan'] },
  });
  vehiclesOptionsTable.push([
    vehicles.vehiclesCount,
    vehicles.vehiclesMaxSpeed,
    vehicles.vehiclesMaxWeight,
  ]);

  console.log('\n🧾 Order Request');
  console.log(orderOptionsTable.toString());

  console.log('\n📦 Packages List');
  console.log(packagesTable.toString());

  console.log('\n🛵 Available Vehicles');
  console.log(vehiclesOptionsTable.toString());

  const check = await confirm({
    message: 'Proceed to place order?',
    default: true,
  });

  return {
    confirm: check,
    options,
  };
};
