import { program } from 'commander';

import { Options, promptCalculate, promptDeliver } from './prompt';

import { ProgramInputSchema } from './schemas';
import { createVehicle } from '../models/vehicle';
import { createOrder } from '../models/order';

import {
  printOrder,
  printOrderCosts,
  printProgramOptions,
  printProgramValidationError,
  printShipments,
} from './print';

export type ProgramOptions = {
  baseCost?: number;
  packagesCount?: number;
  vehiclesCount?: number;
  vehiclesMaxSpeed?: number;
  vehiclesMaxWeight?: number;
};

const buildOrder = (options: Options) => {
  const vehicles = Array(options.vehicles?.vehiclesCount)
    .fill(0)
    .map((_, i) =>
      createVehicle({
        id: `Vehicle ${i + 1}`,
        maxSpeed: options.vehicles?.vehiclesMaxSpeed ?? 0,
        maxWeight: options.vehicles?.vehiclesMaxWeight ?? 0,
      })
    );

  const order = createOrder({
    packages: options.packages,
    baseCost: options.order.baseCost,
  });

  order.calculate().plan(vehicles);

  return order;
};

async function calculate(opts: ProgramOptions = {}) {
  console.log("🧹 Welcome to Kiki's Delivery Service! 🧹");

  const result = ProgramInputSchema.safeParse(opts);

  if (!result.success) {
    printProgramValidationError(result.error);
    process.exit(1);
  }

  if (result.data) {
    printProgramOptions(result.data as ProgramOptions);
  }

  console.log('\n🧹 Please tell us more about your packages\n');

  const { options, confirm } = await promptCalculate(result.data);

  if (!confirm) {
    console.log("\n🧹 Okay, let's start over!\n");
    return deliver(opts);
  }

  const order = createOrder({
    packages: options.packages,
    baseCost: options.order.baseCost,
  });

  order.calculate();

  console.log("\n\n\nOkay! Here's the delivery plan for your order 📦\n");

  printOrderCosts(order);
  printShipments(order);

  console.log("\n\n🧹Thank you for using Kiki's Delivery Service!🧹");
}

async function deliver(opts: ProgramOptions = {}) {
  console.log("🧹 Welcome to Kiki's Delivery Service! 🧹");

  const result = ProgramInputSchema.safeParse(opts);

  if (!result.success) {
    printProgramValidationError(result.error);
    process.exit(1);
  }

  if (result.data) {
    printProgramOptions(result.data as ProgramOptions);
  }

  console.log('\n🧹 Please tell us more about your order\n');

  const { options, confirm } = await promptDeliver(result.data);

  if (!confirm) {
    console.log("\n🧹 Okay, let's start over!\n");
    return deliver(opts);
  }

  const order = buildOrder(options);

  console.log("\n\n\nOkay! Here's the delivery plan for your order 📦\n");

  printOrder(order);
  printShipments(order);

  console.log("\n\n🧹Thank you for using Kiki's Delivery Service!🧹");
}

program
  .version('1.0.0')
  .description("Everest Engineering - Kiki's Delivery Service");

program
  .command('calculate')
  .usage('[options]')
  .description('Calculate costs for delivery of packages.')
  .option('-b, --base-cost <number>', 'Base cost for the order')
  .option('-p, --packages-count <number>', 'Number of packages for the order')
  .action(calculate);

program
  .command('deliver')
  .usage('[options]')
  .description('Create an order and retrieve a delivery plan.')
  .option('-b, --base-cost <number>', 'Base cost for the order')
  .option('-p, --packages-count <number>', 'Number of packages for the order')
  .option('-c, --vehicles-count <number>', 'Number of vehicles')
  .option('-s, --vehicles-max-speed <number>', 'Max speed of the vehicles')
  .option('-w, --vehicles-max-weight <number>', 'Max weight of the vehicles')
  .action(deliver);

program.parse();
