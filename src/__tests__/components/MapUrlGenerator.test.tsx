import { render, screen } from '@testing-library/react';
import MapUrlGenerator from '../../components/MapUrlGenerator';
import * as mapUrlGenerator from '../../utils/mapUrlGenerator';

// Mock the mapUrlGenerator module
jest.mock('../../utils/mapUrlGenerator');

describe('MapUrlGenerator', () => {
  const testCoordinates = [
    { latitude: 40.7308, longitude: -73.9973 },
    { latitude: 40.7295, longitude: -73.9965 }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementations
    (mapUrlGenerator.generateGoogleMapsUrl as jest.Mock).mockReturnValue('https://www.google.com/maps/dir/mock-url');
    (mapUrlGenerator.generateOsrmUrl as jest.Mock).mockReturnValue('https://map.project-osrm.org/?mock-url');
  });

  test('renders warning message when less than 2 coordinates are provided', () => {
    render(<MapUrlGenerator coordinates={[{ latitude: 40.7308, longitude: -73.9973 }]} />);

    expect(screen.getByText(/at least two coordinates are needed/i)).toBeInTheDocument();
    expect(mapUrlGenerator.generateGoogleMapsUrl).not.toHaveBeenCalled();
    expect(mapUrlGenerator.generateOsrmUrl).not.toHaveBeenCalled();
  });

  test('renders Google Maps and OSRM URLs when coordinates are provided', () => {
    const googleMapsUrl = 'https://www.google.com/maps/dir/40.7308,-73.9973/40.7295,-73.9965';
    const osrmUrl = 'https://map.project-osrm.org/?loc=40.7308%2C-73.9973&loc=40.7295%2C-73.9965';

    (mapUrlGenerator.generateGoogleMapsUrl as jest.Mock).mockReturnValue(googleMapsUrl);
    (mapUrlGenerator.generateOsrmUrl as jest.Mock).mockReturnValue(osrmUrl);

    render(<MapUrlGenerator coordinates={testCoordinates} />);

    expect(mapUrlGenerator.generateGoogleMapsUrl).toHaveBeenCalledWith(testCoordinates);
    expect(mapUrlGenerator.generateOsrmUrl).toHaveBeenCalledWith(testCoordinates);

    expect(screen.getByText('Google Maps')).toBeInTheDocument();
    expect(screen.getByText('OSRM')).toBeInTheDocument();

    const googleMapsLink = screen.getByText(googleMapsUrl);
    const osrmLink = screen.getByText(osrmUrl);

    expect(googleMapsLink).toBeInTheDocument();
    expect(googleMapsLink.getAttribute('href')).toBe(googleMapsUrl);

    expect(osrmLink).toBeInTheDocument();
    expect(osrmLink.getAttribute('href')).toBe(osrmUrl);
  });
});
