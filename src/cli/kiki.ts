import { program } from 'commander';

import { Options, prompt } from './prompt';

import { ProgramInputSchema } from './schemas';
import { createVehicle } from '../models/vehicle';
import { createOrder } from '../models/order';

import {
  printOrder,
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

program
  .version('1.0.0')
  .description(
    'Everest Engineering - Kiki Delivery Service. Create an order and retrieve a delivery plan.'
  )
  .usage('[options]')
  .option('-b, --base-cost <number>', 'Base cost for the order')
  .option('-p, --packages-count <number>', 'Number of packages for the order')
  .option('-c, --vehicles-count <number>', 'Number of vehicles')
  .option('-s, --vehicles-max-speed <number>', 'Max speed of the vehicles')
  .option('-w, --vehicles-max-weight <number>', 'Max weight of the vehicles');

const buildOrder = (options: Options) => {
  const vehicles = Array(options.vehicles.vehiclesCount)
    .fill(0)
    .map((_, i) =>
      createVehicle({
        id: `Vehicle ${i + 1}`,
        maxSpeed: options.vehicles.vehiclesMaxSpeed,
        maxWeight: options.vehicles.vehiclesMaxWeight,
      })
    );

  const order = createOrder({
    packages: options.packages,
    baseCost: options.order.baseCost,
  });

  order.calculate().plan(vehicles);

  return order;
};

async function main() {
  program.parse();

  console.log('🧹 Welcome to Kiki Delivery Service! 🧹');

  const result = ProgramInputSchema.safeParse(program.opts());

  if (!result.success) {
    printProgramValidationError(result.error);
    process.exit(1);
  }

  if (result.data) {
    printProgramOptions(result.data as ProgramOptions);
  }

  console.log('\n🧹 Please tell us more about your order\n');

  const { options, confirm } = await prompt(result.data);

  if (!confirm) {
    console.log("\n🧹 Okay, let's start over!\n");
    return main();
  }

  const order = buildOrder(options);

  console.log("\n\n\nOkay! Here's the delivery plan for your order 📦\n");

  printOrder(order);
  printShipments(order);

  console.log('\n\n🧹Thank you for using Kiki Delivery Service!🧹');
}

main();
