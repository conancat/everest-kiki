import inquirer from 'inquirer';
import {
  validateOrderInput,
  validatePackageInput,
  validateVehicleInput,
} from './validate';
import { parseOrderInput, parsePackageInput, parseVehicleInput } from './parse';

const promptOrderInput = async () => {
  const results = await inquirer.prompt([
    {
      type: 'input',
      name: 'order',
      message: 'Enter order details',
      suffix: ' [<baseCost> <packagesCount>]:',
      validate: validateOrderInput,
    },
  ]);

  return parseOrderInput(results.order);
};

const promptPackagesInput = async (count: number) => {
  const prompts = Array.from({ length: count }).map((_, i) => ({
    type: 'input',
    name: `package_${i + 1}`,
    message: `Package ${i + 1}`,
    suffix: ' [<id> <weight> <distance> [offerCode]]:',
    validate: validatePackageInput,
  }));

  const results = await inquirer.prompt(prompts);

  const packages = Object.values(results).map((input) =>
    parsePackageInput(input as string)
  );

  return packages;
};

const promptVehiclesInput = async () => {
  const results = await inquirer.prompt([
    {
      type: 'input',
      name: 'vehicles',
      message: 'Enter vehicles details',
      suffix: ' [<count> <maxSpeed> <maxWeight>]:',
      validate: validateVehicleInput,
    },
  ]);

  return parseVehicleInput(results.vehicles);
};

export const prompt = async () => {
  const order = await promptOrderInput();
  const packages = await promptPackagesInput(order.packagesCount);
  const vehicles = await promptVehiclesInput();
  return {
    order,
    packages,
    vehicles,
  };
};
