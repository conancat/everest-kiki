import { ZodError, ZodSchema } from 'zod';
import {
  BaseCostInputSchema,
  PackagesCountInputSchema,
  VehiclesCountInputSchema,
  VehiclesMaxSpeedInputSchema,
  VehiclesMaxWeightInputSchema,
  OrderInputSchema,
  PackageInputSchema,
  VehiclesInputSchema,
} from './schemas';

type ValidationResult = string | true;

const formatZodError = (error: ZodError) => {
  if (error.format()._errors.length) {
    return error.format()._errors.join(', ');
  }

  return Object.entries(structuredClone(error.format()))
    .filter(([key]) => key !== '_errors')
    .map(
      ([key, value]) =>
        `${key}: ${(value as unknown as { _errors: string[] })._errors?.join(
          ', '
        )}`
    )
    .join(' | ');
};

export const validateInput = (
  input: string,
  schema: ZodSchema,
  keys?: string[]
): ValidationResult => {
  if (!input.length) {
    return 'Please enter a valid input.';
  }

  console.log(input);

  const arr = input.split(' ');

  const results = keys
    ? schema.safeParse(
        Object.fromEntries(keys.map((key, index) => [key, arr[index]]))
      )
    : schema.safeParse(input);

  console.log({
    input,
    results,
  });

  if (!results.success) {
    return formatZodError(results.error);
  }

  return results.success;
};

export const validatePackageInput = (input: string) =>
  validateInput(input, PackageInputSchema, [
    'id',
    'weight',
    'distance',
    'offerCode',
  ]);
