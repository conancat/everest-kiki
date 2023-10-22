import { prompt } from './prompt';

import { program } from 'commander';
import { ProgramInputSchema } from './schemas';
import { formatZodError } from '../utils';
import { createVehicle } from '../models/vehicle';
import { createOrder } from '../models/order';

import Table from 'cli-table3';
import Shipment from '../models/shipment';

program
  .option('-b, --base-cost <number>', 'Base cost')
  .option('-p, --packages-count <number>', 'Packages count')
  .option('-c, --vehicles-count <number>', 'Vehicles count')
  .option('-s, --vehicles-max-speed <number>', 'Vehicles max speed')
  .option('-w, --vehicles-max-weight <number>', 'Vehicles max weight');

async function main() {
  program.parse();

  console.log('🧹 Welcome to Kiki Delivery Service! 🧹');

  const result = ProgramInputSchema.safeParse(program.opts());

  if (!result.success) {
    const errorMsg = formatZodError(result.error)
      .split(' | ')
      .map((str: string) => '  * ' + str)
      .join('\n');

    console.log('Error parsing program options:');
    console.log(errorMsg);
    process.exit(1);
  }

  if (result.data) {
    console.log('\n🧹 You have provided the following options 👀:');

    Object.entries(result.data).forEach(([key, value]) => {
      console.log(`  * ${key}: ${value}`);
    });
  }

  console.log('\n🧹 Please tell us more about your order\n');

  const { options, confirm } = await prompt(result.data);

  if (!confirm) {
    return main();
  }

  const vehicles = Array(options.vehicles.vehiclesCount)
    .fill(0)
    .map((_, i) =>
      createVehicle({
        id: `Vehicle ${i + 1}`,
        maxSpeed: 70,
        maxWeight: 200,
      })
    );

  const order = createOrder({
    packages: options.packages,
    baseCost: 100,
  });

  order.calculate().plan(vehicles);
  console.log("\n\n\nOkay! Here's the delivery plan for your order 📦\n");

  const orderTable = new Table({
    head: [
      'Base Cost',
      'Packages Count',
      'Weight',
      'Distance',
      'Delivery Cost',
      'Discount',
      'Total Cost',
    ],
  });

  orderTable.push([
    options.order.baseCost,
    order.packages.length,
    order.totalWeight,
    order.totalDistance,
    order.totalDeliveryCost,
    order.totalDiscount,
    order.finalCost,
  ]);

  const orderPackagesTable = new Table({
    head: [
      'ID',
      'Weight',
      'Distance',
      'Delivery Time',
      'Arrival Time',
      'Delivery Cost',
      'Discount',
      'Total Cost',
    ],
  });

  order.packages.forEach((pkg) => {
    orderPackagesTable.push([
      pkg.id,
      pkg.weight,
      pkg.distance,
      pkg.deliveryTime,
      pkg.arrivalTime,
      pkg.deliveryCost,
      pkg.discount,
      pkg.totalCost,
    ]);
  });

  console.log('\n🧾 Order Details');
  console.log(orderTable.toString());
  console.log('\n📦 Packages List');
  console.log(orderPackagesTable.toString());

  order.shipments.forEach((shipment, i) => {
    const shipmentTable = new Table({
      head: [
        'Vehicle',
        'Packages Count',
        'Total Distance',
        'Total Weight',
        'Total Cost',
      ],
    });

    shipmentTable.push([
      shipment.vehicle.id,
      shipment.packages.length,
      shipment.totalDistance,
      shipment.totalWeight,
      shipment.totalCost,
    ]);

    const shipmentPackagesTable = new Table({
      head: [
        'ID',
        'Weight',
        'Distance',
        'Delivery Time',
        'Arrival Time',
        'Delivery Cost',
        'Discount',
        'Total Cost',
      ],
    });

    shipment.packages.forEach((pkg) => {
      shipmentPackagesTable.push([
        pkg.id,
        pkg.weight,
        pkg.distance,
        pkg.deliveryTime,
        pkg.arrivalTime,
        pkg.deliveryCost,
        pkg.discount,
        pkg.totalCost,
      ]);
    });

    console.log(`\n🛵 Shipment ${i + 1}`);
    console.log(shipmentTable.toString());
    console.log(shipmentPackagesTable.toString());
  });

  console.log('\n\n🧹Thank you for using Kiki Delivery Service!🧹');
}

main();
