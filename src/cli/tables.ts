import Table from 'cli-table3';
import Shipment from '../models/shipment';
import Order from '../models/order';

export const buildOrderTable = (order: Order) => {
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
    order.baseCost,
    order.packages.length,
    order.totalWeight,
    order.totalDistance,
    order.totalDeliveryCost,
    order.totalDiscount,
    order.finalCost,
  ]);

  return orderTable;
};

export const buildOrderPackagesTable = (order: Order) => {
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

  return orderPackagesTable;
};

export const buildShipmentTable = (shipment: Shipment) => {
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

  return shipmentTable;
};

export const buildShipmentPackagesTable = (shipment: Shipment) => {
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

  return shipmentPackagesTable;
};
