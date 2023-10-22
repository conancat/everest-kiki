import { Package, createPackage } from '../package';
import { createVehicle } from '../vehicle';

describe('createVehicle()', () => {
  it('should return a vehicle object', () => {
    const vehicle = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 70,
      maxWeight: 200,
    });

    expect(vehicle.id).toBe('VEHICLE_1');
    expect(vehicle.maxSpeed).toBe(70);
    expect(vehicle.maxWeight).toBe(200);
  });

  it("should calculate the vehicle's travel time for delivering a package", () => {
    const vehicle = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 70,
      maxWeight: 200,
    });

    const pkg: Package = createPackage({
      id: 'PKG2',
      weight: 75,
      distance: 125,
      baseCost: 100,
    });

    const travelTime = vehicle.calculateDeliveryTime(pkg);

    expect(travelTime).toBe(1.78);
  });

  it('should set the delivery time for each package after a single delivery', () => {
    const vehicle = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 70,
      maxWeight: 200,
    });

    const packages: Package[] = [
      {
        id: 'PKG2',
        weight: 75,
        distance: 125,
        baseCost: 100,
      },
      {
        id: 'PKG4',
        weight: 110,
        distance: 60,
        baseCost: 100,
      },
    ].map(createPackage);

    vehicle.deliverPackages(packages);

    expect(packages[0].deliveryTime).toBe(1.78);
    expect(packages[1].deliveryTime).toBe(0.85);
  });

  it("should calculate the vehicle's total travel time after delivering multiple packages in a single delivery", () => {
    const vehicle = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 70,
      maxWeight: 200,
    });

    const packages: Package[] = [
      {
        id: 'PKG2',
        weight: 75,
        distance: 125,
        baseCost: 100,
      },
      {
        id: 'PKG4',
        weight: 110,
        distance: 60,
        baseCost: 100,
      },
    ].map(createPackage);

    vehicle.deliverPackages(packages);

    expect(vehicle.totalTravelTime).toBe(3.56);
  });

  it("should calculate the vehicle's total travel time after multiple deliveries (Vehicle 1)", () => {
    const vehicle = createVehicle({
      id: 'VEHICLE_1',
      maxSpeed: 70,
      maxWeight: 200,
    });

    const delivery1: Package[] = [
      {
        id: 'PKG2',
        weight: 75,
        distance: 125,
        baseCost: 100,
      },
      {
        id: 'PKG4',
        weight: 110,
        distance: 60,
        baseCost: 100,
      },
    ].map(createPackage);

    const delivery2: Package[] = [
      {
        id: 'PKG1',
        weight: 50,
        distance: 30,
        baseCost: 100,
      },
    ].map(createPackage);

    vehicle.deliverPackages(delivery1);
    expect(vehicle.packages.length).toBe(2);
    expect(vehicle.totalTravelTime).toBe(3.56);

    vehicle.deliverPackages(delivery2);
    expect(vehicle.packages.length).toBe(3);
    expect(vehicle.totalTravelTime).toBe(4.4);

    expect(vehicle.deliveries.length).toBe(2);
    expect(vehicle.deliveries[0]).toEqual(delivery1);
    expect(vehicle.deliveries[1]).toEqual(delivery2);

    expect(delivery1[0].finalDeliveryTime).toBe(1.78);
    expect(delivery1[1].finalDeliveryTime).toBe(0.85);
    expect(delivery2[0].finalDeliveryTime).toBe(3.98);
  });

  it("should calculate the vehicle's total travel time after multiple deliveries (Vehicle 2)", () => {
    const vehicle = createVehicle({
      id: 'VEHICLE_2',
      maxSpeed: 70,
      maxWeight: 200,
    });

    const delivery1: Package[] = [
      {
        id: 'PKG3',
        weight: 175,
        distance: 100,
        baseCost: 100,
      },
    ].map(createPackage);

    const delivery2: Package[] = [
      {
        id: 'PKG5',
        weight: 155,
        distance: 95,
        baseCost: 100,
      },
    ].map(createPackage);

    // Delivery 1 return travel time: 2.84
    vehicle.deliverPackages(delivery1);
    expect(vehicle.packages.length).toBe(1);
    expect(vehicle.totalTravelTime).toBe(2.84);

    // Delivery 2 return travel time: 5.54
    vehicle.deliverPackages(delivery2);
    expect(vehicle.packages.length).toBe(2);
    expect(vehicle.totalTravelTime).toBe(5.54);

    expect(vehicle.deliveries.length).toBe(2);
    expect(vehicle.deliveries[0]).toEqual(delivery1);
    expect(vehicle.deliveries[1]).toEqual(delivery2);

    expect(vehicle.packages[0].finalDeliveryTime).toBe(1.42);
    expect(vehicle.packages[1].finalDeliveryTime).toBe(4.19);
  });
});
