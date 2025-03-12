import { Coordinate } from './types';

/**
 * Extracts coordinates from a text string.
 * Looks for patterns like "latitude: X, longitude: Y" or "latitude: X" and "longitude: Y" nearby.
 *
 * @param text - The input text to parse for coordinates
 * @returns An array of Coordinate objects
 */
export const extractCoordinates = (text: string): Coordinate[] => {
  if (!text) return [];

  const coordinates: Coordinate[] = [];

  // Pattern for "latitude: X, longitude: Y" or "latitude: X" and "longitude: Y" nearby
  // This regex looks for decimal numbers that follow the words "latitude:" and "longitude:"
  const latitudeRegex = /latitude:\s*([-+]?\d+\.?\d*)/gi;
  const longitudeRegex = /longitude:\s*([-+]?\d+\.?\d*)/gi;

  const latitudeMatches: number[] = [];
  const longitudeMatches: number[] = [];

  // Extract all latitude values
  let latMatch;
  while ((latMatch = latitudeRegex.exec(text)) !== null) {
    latitudeMatches.push(parseFloat(latMatch[1]));
  }

  // Extract all longitude values
  let lngMatch;
  while ((lngMatch = longitudeRegex.exec(text)) !== null) {
    longitudeMatches.push(parseFloat(lngMatch[1]));
  }

  // If we have the same number of latitudes and longitudes, pair them up
  if (latitudeMatches.length === longitudeMatches.length) {
    for (let i = 0; i < latitudeMatches.length; i++) {
      coordinates.push({
        latitude: latitudeMatches[i],
        longitude: longitudeMatches[i]
      });
    }
  }

  return coordinates;
};
