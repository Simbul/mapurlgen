import { extractCoordinates } from '../../utils/coordinateParser';

describe('coordinateParser', () => {
  test('should extract coordinates from text with latitude and longitude', () => {
    const text = 'A park located at latitude: 40.7308 and longitude: -73.9973, near the NYU campus (latitude: 40.7295, longitude: -73.9965)';
    const result = extractCoordinates(text);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ latitude: 40.7308, longitude: -73.9973 });
    expect(result[1]).toEqual({ latitude: 40.7295, longitude: -73.9965 });
  });

  test('should return empty array for text without coordinates', () => {
    const text = 'This text does not contain any coordinates';
    const result = extractCoordinates(text);

    expect(result).toHaveLength(0);
  });

  test('should return empty array for empty text', () => {
    const result = extractCoordinates('');

    expect(result).toHaveLength(0);
  });

  test('should handle different formats of latitude and longitude', () => {
    const text = 'Location at latitude: +40.7308 and longitude: -73.9973. Another at latitude:40.7295,longitude:-73.9965';
    const result = extractCoordinates(text);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ latitude: 40.7308, longitude: -73.9973 });
    expect(result[1]).toEqual({ latitude: 40.7295, longitude: -73.9965 });
  });

  test('should only pair coordinates when there are equal numbers of latitudes and longitudes', () => {
    const text = 'Location at latitude: 40.7308 and longitude: -73.9973. Another at latitude: 40.7295';
    const result = extractCoordinates(text);

    // Since there's one latitude without a matching longitude, no coordinates should be returned
    expect(result).toHaveLength(0);
  });
});
