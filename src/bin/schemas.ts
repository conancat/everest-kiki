import { z } from 'zod';
import { Package } from '../models/package';

export const BaseCostInputSchema = z.coerce
  .number({
    required_error: 'Please enter a valid base cost.',
    invalid_type_error: 'Base cost must be a number.',
  })
  .positive('Base cost must be a positive number.');

export const PackagesCountInputSchema = z.coerce
  .number({
    required_error: 'Please enter a valid packages count.',
    invalid_type_error: 'Packages count must be an integer.',
  })
  .int({
    message: 'Packages count must be an integer.',
  })
  .positive({
    message: 'Packages count must be a positive integer.',
  });

export const VehiclesCountInputSchema = z.coerce
  .number({
    required_error: 'Please enter a valid vehicles count.',
    invalid_type_error: 'Vehicles count must be an integer.',
  })
  .int({
    message: 'Vehicles count must be an integer.',
  })
  .positive({
    message: 'Vehicles count must be a positive integer.',
  });

export const VehiclesMaxSpeedInputSchema = z.coerce
  .number({
    required_error: 'Please enter a valid max speed.',
    invalid_type_error: 'Max speed must be an integer.',
  })
  .int({
    message: 'Max speed must be an integer.',
  })
  .positive({
    message: 'Max speed must be a positive integer.',
  });

export const VehiclesMaxWeightInputSchema = z.coerce
  .number({
    required_error: 'Please enter a valid max weight.',
    invalid_type_error: 'Max weight must be an integer.',
  })
  .int({
    message: 'Max weight must be an integer.',
  })
  .positive({
    message: 'Max weight must be a positive integer.',
  });

export const PackageIdInputSchema = z
  .string({
    required_error: 'Please enter a valid package ID.',
    invalid_type_error: 'Package ID must be a string.',
  })
  .regex(/^[a-zA-Z0-9]+$/, 'Package ID must be alphanumeric.');

export const PackageWeightInputSchema = z.coerce
  .number({
    required_error: 'Please enter a valid package weight.',
    invalid_type_error: 'Package weight must be an integer.',
  })
  .int({
    message: 'Package weight must be an integer.',
  })
  .positive({
    message: 'Package weight must be a positive integer.',
  });

export const PackageDistanceInputSchema = z.coerce
  .number({
    required_error: 'Please enter a valid package distance.',
    invalid_type_error: 'Package distance must be an integer.',
  })
  .int({
    message: 'Package distance must be an integer.',
  })
  .positive({
    message: 'Package distance must be a positive integer.',
  });

export const PackageOfferCodeInputSchema = z
  .string({
    required_error: 'Please enter a valid offer code.',
    invalid_type_error: 'Offer code must be a string.',
  })
  .regex(/^[a-zA-Z0-9]+$/, {
    message: 'Offer code must be alphanumeric.',
  })
  .optional();

export const OrderInputSchema = z.object({
  baseCost: BaseCostInputSchema,
  packagesCount: PackagesCountInputSchema,
});

export const PackageInputSchema = z.object({
  id: PackageIdInputSchema,
  weight: PackageWeightInputSchema,
  distance: PackageDistanceInputSchema,
  offerCode: PackageOfferCodeInputSchema,
});

export const VehiclesInputSchema = z.object({
  count: VehiclesCountInputSchema,
  maxSpeed: VehiclesMaxSpeedInputSchema,
  maxWeight: VehiclesMaxWeightInputSchema,
});

export default {
  BaseCostInputSchema,
  PackagesCountInputSchema,
  VehiclesCountInputSchema,
  VehiclesMaxSpeedInputSchema,
  VehiclesMaxWeightInputSchema,
  PackageIdInputSchema,
  PackageWeightInputSchema,
  PackageDistanceInputSchema,
  PackageOfferCodeInputSchema,
  OrderInputSchema,
  PackageInputSchema,
  VehiclesInputSchema,
};
