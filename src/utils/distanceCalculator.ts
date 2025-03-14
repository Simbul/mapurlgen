import { Coordinate } from './types';

/**
 * Calculates the Haversine distance between two coordinates in meters.
 * The Haversine formula determines the great-circle distance between two points on a sphere
 * given their longitudes and latitudes.
 *
 * @param point1 First coordinate
 * @param point2 Second coordinate
 * @returns Distance in meters
 */
export function calculateHaversineDistance(point1: Coordinate, point2: Coordinate): number {
  // Earth's radius in meters
  const earthRadius = 6371000;

  // Convert latitude and longitude from degrees to radians
  const lat1 = toRadians(point1.latitude);
  const lon1 = toRadians(point1.longitude);
  const lat2 = toRadians(point2.latitude);
  const lon2 = toRadians(point2.longitude);

  // Differences in coordinates
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

/**
 * Converts degrees to radians
 *
 * @param degrees Angle in degrees
 * @returns Angle in radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
