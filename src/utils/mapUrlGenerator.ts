import { Coordinate } from './types';

/**
 * Generates a Google Maps URL for directions between multiple coordinates.
 *
 * @param coordinates - Array of coordinates to include in the route
 * @returns A Google Maps URL string
 */
export const generateGoogleMapsUrl = (coordinates: Coordinate[]): string => {
  if (coordinates.length < 2) {
    return '';
  }

  // Format: https://www.google.com/maps/dir/lat1,lng1/lat2,lng2/...
  const baseUrl = 'https://www.google.com/maps/dir/';

  const coordinateStrings = coordinates.map(coord =>
    `${coord.latitude},${coord.longitude}`
  );

  return baseUrl + coordinateStrings.join('/');
};

/**
 * Generates an OSRM (Open Source Routing Machine) URL for directions between multiple coordinates.
 *
 * @param coordinates - Array of coordinates to include in the route
 * @returns An OSRM URL string
 */
export const generateOsrmUrl = (coordinates: Coordinate[]): string => {
  if (coordinates.length < 2) {
    return '';
  }

  // Format: https://map.project-osrm.org/?loc=lat1,lng1&loc=lat2,lng2&...
  const baseUrl = 'https://map.project-osrm.org/?';

  const locParams = coordinates.map(coord =>
    `loc=${coord.latitude}%2C${coord.longitude}`
  );

  return baseUrl + locParams.join('&');
};
