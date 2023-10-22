import { ZodError } from 'zod';
import { Package } from '../models/package';
import { Vehicle } from '../models/vehicle';

export const sortPackages = (packages: Package[]) =>
  packages.sort((a: Package, b: Package) => {
    if (a.weight > b.weight) {
      return -1;
    } else if (a.weight < b.weight) {
      return 1;
    } else if (a.distance > b.distance) {
      return 1;
    } else if (a.distance < b.distance) {
      return -1;
    }

    return a.id.localeCompare(b.id);
  });

/**
 * Select the next available vehicle based on the vehicle's travel time.
 * @param vehicles
 * @returns Vehicle
 */

export const getNextAvailableVehicle = (vehicles: Vehicle[]): Vehicle => {
  return vehicles.sort((a, b) => a.totalTravelTime - b.totalTravelTime)[0];
};

export const formatZodError = (error: ZodError) => {
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
