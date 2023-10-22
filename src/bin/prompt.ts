import inquirer from 'inquirer';
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

const askFor = async (options: PromptOneOptions) => {
  const inputs = await inquirer.prompt({
    type: 'input',
    name: options.key,
    message: options.message,
    suffix: ` [${options.key}]:`,
    validate: options.validate,
  });

  const result = options.parse(inputs[options.key]);

  return result;
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

export const prompt = async (promptOptions: PromptOptions = {}) => {
  const order = {
    baseCost:
      promptOptions.baseCost ||
      (await askFor({
        key: 'baseCost',
        message: 'Enter order base cost',
        validate: validateBaseCostInput,
        parse: parseBaseCostInput,
      })),
    packagesCount:
      promptOptions.packagesCount ||
      (await askFor({
        key: 'packagesCount',
        message: 'Enter order packages count',
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
        message: 'Enter vehicles count',
        validate: validateVehiclesCountInput,
        parse: parseVehiclesCountInput,
      })),
    vehiclesMaxSpeed:
      promptOptions.vehiclesMaxSpeed ||
      (await askFor({
        key: 'vehiclesMaxSpeed',
        message: 'Enter vehicles max speed',
        validate: validateVehiclesMaxSpeedInput,
        parse: parseVehiclesMaxSpeedInput,
      })),
    vehiclesMaxWeight:
      promptOptions.vehiclesMaxWeight ||
      (await askFor({
        key: 'vehiclesMaxWeight',
        message: 'Enter vehicles max weight',
        validate: validateVehiclesMaxWeightInput,
        parse: parseVehiclesMaxWeightInput,
      })),
  };

  const options = {
    order,
    packages,
    vehicles,
  };

  // console.log('Your order is as follows:');

  console.table(options.packages);

  // return {
  //   order,
  //   packages,
  //   vehicles,
  // };
};
