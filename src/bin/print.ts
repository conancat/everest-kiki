import Shipment from '../models/shipment';
import Order from '../models/order';

import {
  buildOrderTable,
  buildOrderPackagesTable,
  buildShipmentTable,
  buildShipmentPackagesTable,
} from './tables';
import { ZodError } from 'zod';
import { formatZodError } from '../utils';
import { ProgramOptions } from '.';

export const printOrder = (order: Order) => {
  const orderTable = buildOrderTable(order);
  const orderPackagesTable = buildOrderPackagesTable(order);

  console.log('\n🧾 Order Details');
  console.log(orderTable.toString());

  console.log('\n📦 Packages List');
  console.log(orderPackagesTable.toString());
};

export const printShipment = (shipment: Shipment, i: number) => {
  const shipmentTable = buildShipmentTable(shipment);
  const shipmentPackagesTable = buildShipmentPackagesTable(shipment);

  console.log(`\n🛵 Shipment ${i + 1}`);
  console.log(shipmentTable.toString());
  console.log(shipmentPackagesTable.toString());
};

export const printShipments = (order: Order) => {
  console.log('\n📦 Shipments List');

  order.shipments.forEach((shipment, i) => printShipment(shipment, i));
};

export const printProgramValidationError = (error: ZodError) => {
  const errorMsg = formatZodError(error)
    .split(' | ')
    .map((str: string) => '  * ' + str)
    .join('\n');

  console.log('Error parsing program options:');
  console.log(errorMsg);
};

export const printProgramOptions = (options: ProgramOptions) => {
  console.log('\n🧹 You have provided the following options 👀:');

  Object.entries(options).forEach(([key, value]) => {
    console.log(`  * ${key}: ${value}`);
  });
};
