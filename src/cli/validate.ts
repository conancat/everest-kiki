import { ZodSchema } from 'zod';
import schemas from './schemas';
import { formatZodError } from '../utils';

type ValidationResult = string | true;

export const validateInput =
  (schema: ZodSchema, keys?: string[]) =>
  (input: string): ValidationResult => {
    if (!input.length) {
      return 'Please enter a valid input.';
    }

    const arr = input.split(' ');

    const results = keys
      ? schema.safeParse(
          Object.fromEntries(keys.map((key, index) => [key, arr[index]]))
        )
      : schema.safeParse(input);

    if (!results.success) {
      return formatZodError(results.error);
    }

    return results.success;
  };

export const validateBaseCostInput = validateInput(schemas.BaseCostInputSchema);
export const validatePackagesCountInput = validateInput(
  schemas.PackagesCountInputSchema
);

export const validateVehiclesCountInput = validateInput(
  schemas.VehiclesCountInputSchema
);
export const validateVehiclesMaxSpeedInput = validateInput(
  schemas.VehiclesMaxSpeedInputSchema
);

export const validateVehiclesMaxWeightInput = validateInput(
  schemas.VehiclesMaxWeightInputSchema
);

export const validatePackageInput = validateInput(schemas.PackageInputSchema, [
  'id',
  'weight',
  'distance',
  'offerCode',
]);
