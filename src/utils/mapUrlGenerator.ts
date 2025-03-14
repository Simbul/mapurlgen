import { Coordinate } from './types';

/**
 * Generates a Google Maps URL for directions between multiple coordinates,
 * or a place marker for a single coordinate.
 *
 * @param coordinates - Array of coordinates to include in the route
 * @returns A Google Maps URL string
 */
export const generateGoogleMapsUrl = (coordinates: Coordinate[]): string => {
  if (coordinates.length === 0) {
    return '';
  }

  if (coordinates.length === 1) {
    // For a single coordinate, use the place URL format
    const coord = coordinates[0];
    return `https://www.google.com/maps/place/${coord.latitude},${coord.longitude}/`;
  }

  // Format: https://www.google.com/maps/dir/lat1,lng1/lat2,lng2/...
  const baseUrl = 'https://www.google.com/maps/dir/';

  const coordinateStrings = coordinates.map(coord =>
    `${coord.latitude},${coord.longitude}`
  );

  return baseUrl + coordinateStrings.join('/');
};

/**
 * Generates an OSRM (Open Source Routing Machine) URL for directions between multiple coordinates,
 * or an OpenStreetMap search URL for a single coordinate.
 *
 * @param coordinates - Array of coordinates to include in the route
 * @returns An OSRM or OpenStreetMap URL string
 */
export const generateOsrmUrl = (coordinates: Coordinate[]): string => {
  if (coordinates.length === 0) {
    return '';
  }

  if (coordinates.length === 1) {
    // For a single coordinate, use OpenStreetMap search
    const coord = coordinates[0];
    return `https://www.openstreetmap.org/search?query=${coord.latitude}%2C+${coord.longitude}`;
  }

  // Format: https://map.project-osrm.org/?loc=lat1,lng1&loc=lat2,lng2&...
  const baseUrl = 'https://map.project-osrm.org/?';

  const locParams = coordinates.map(coord =>
    `loc=${coord.latitude}%2C${coord.longitude}`
  );

  return baseUrl + locParams.join('&');
};
