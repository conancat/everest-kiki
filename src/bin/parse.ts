import type { ZodSchema } from 'zod';
import {
  OrderInputSchema,
  PackageInputSchema,
  VehiclesInputSchema,
} from './schemas';

type OrderInput = {
  baseCost: number;
  packagesCount: number;
};

type PackageInput = {
  id: string;
  weight: number;
  distance: number;
  offerCode?: string;
};

type VehiclesInput = {
  count: number;
  maxSpeed: number;
  maxWeight: number;
};

const parseInput = (input: string, keys: string[], schema: ZodSchema) => {
  const arr = input.split(' ');
  const obj = Object.fromEntries(keys.map((key, index) => [key, arr[index]]));
  return schema.parse(obj);
};

export const parseOrderInput = (input: string): OrderInput => {
  return parseInput(input, ['baseCost', 'packagesCount'], OrderInputSchema);
};

export const parsePackageInput = (input: string): PackageInput =>
  parseInput(
    input,
    ['id', 'weight', 'distance', 'offerCode'],
    PackageInputSchema
  );

export const parseVehicleInput = (input: string): VehiclesInput =>
  parseInput(input, ['count', 'maxSpeed', 'maxWeight'], VehiclesInputSchema);
