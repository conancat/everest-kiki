import type { ZodSchema } from 'zod';
import schemas, {
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

export const parseInput =
  <T>(schema: ZodSchema, keys?: string[]) =>
  (input: string): T => {
    if (!keys) {
      return schema.parse(input);
    }

    const arr = input.split(' ');
    const obj = Object.fromEntries(keys.map((key, index) => [key, arr[index]]));
    return schema.parse(obj);
  };

export const parseBaseCostInput = parseInput<number>(
  schemas.BaseCostInputSchema
);

export const parsePackagesCountInput = parseInput<number>(
  schemas.PackagesCountInputSchema
);

export const parseVehiclesCountInput = parseInput<number>(
  schemas.VehiclesCountInputSchema
);

export const parseVehiclesMaxSpeedInput = parseInput<number>(
  schemas.VehiclesMaxSpeedInputSchema
);

export const parseVehiclesMaxWeightInput = parseInput<number>(
  schemas.VehiclesMaxWeightInputSchema
);

export const parseOrderInput = parseInput<OrderInput>(OrderInputSchema, [
  'baseCost',
  'packagesCount',
]);

export const parsePackageInput = parseInput<PackageInput>(PackageInputSchema, [
  'id',
  'weight',
  'distance',
  'offerCode',
]);

export const parseVehicleInput = parseInput<VehiclesInput>(
  VehiclesInputSchema,
  ['count', 'maxSpeed', 'maxWeight']
);
