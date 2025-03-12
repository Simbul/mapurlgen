import { generateGoogleMapsUrl, generateOsrmUrl } from '../../utils/mapUrlGenerator';
import { Coordinate } from '../../utils/types';

describe('mapUrlGenerator', () => {
  const testCoordinates: Coordinate[] = [
    { latitude: 40.7308, longitude: -73.9973 },
    { latitude: 40.7295, longitude: -73.9965 }
  ];

  describe('generateGoogleMapsUrl', () => {
    test('should generate correct Google Maps URL for multiple coordinates', () => {
      const url = generateGoogleMapsUrl(testCoordinates);
      const expected = 'https://www.google.com/maps/dir/40.7308,-73.9973/40.7295,-73.9965';

      expect(url).toBe(expected);
    });

    test('should return empty string for less than 2 coordinates', () => {
      const url = generateGoogleMapsUrl([{ latitude: 40.7308, longitude: -73.9973 }]);

      expect(url).toBe('');
    });

    test('should handle more than 2 coordinates', () => {
      const coordinates = [
        ...testCoordinates,
        { latitude: 40.7128, longitude: -74.006 }
      ];

      const url = generateGoogleMapsUrl(coordinates);
      const expected = 'https://www.google.com/maps/dir/40.7308,-73.9973/40.7295,-73.9965/40.7128,-74.006';

      expect(url).toBe(expected);
    });
  });

  describe('generateOsrmUrl', () => {
    test('should generate correct OSRM URL for multiple coordinates', () => {
      const url = generateOsrmUrl(testCoordinates);
      const expected = 'https://map.project-osrm.org/?loc=40.7308%2C-73.9973&loc=40.7295%2C-73.9965';

      expect(url).toBe(expected);
    });

    test('should return empty string for less than 2 coordinates', () => {
      const url = generateOsrmUrl([{ latitude: 40.7308, longitude: -73.9973 }]);

      expect(url).toBe('');
    });

    test('should handle more than 2 coordinates', () => {
      const coordinates = [
        ...testCoordinates,
        { latitude: 40.7128, longitude: -74.006 }
      ];

      const url = generateOsrmUrl(coordinates);
      const expected = 'https://map.project-osrm.org/?loc=40.7308%2C-73.9973&loc=40.7295%2C-73.9965&loc=40.7128%2C-74.006';

      expect(url).toBe(expected);
    });
  });
});
