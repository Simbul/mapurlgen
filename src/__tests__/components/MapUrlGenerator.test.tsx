import { render, screen } from '@testing-library/react';
import MapUrlGenerator from '../../components/MapUrlGenerator';
import * as mapUrlGenerator from '../../utils/mapUrlGenerator';
import { describe, test, expect, beforeEach, vi } from 'vitest';

// Mock the mapUrlGenerator module
vi.mock('../../utils/mapUrlGenerator');

describe('MapUrlGenerator', () => {
  const testCoordinates = [
    { latitude: 40.7308, longitude: -73.9973 },
    { latitude: 40.7295, longitude: -73.9965 }
  ];

  const singleCoordinate = [
    { latitude: 40.7308, longitude: -73.9973 }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementations
    (mapUrlGenerator.generateGoogleMapsUrl as any).mockReturnValue('https://www.google.com/maps/dir/mock-url');
    (mapUrlGenerator.generateOsrmUrl as any).mockReturnValue('https://map.project-osrm.org/?mock-url');
  });

  test('renders warning message when no coordinates are provided', () => {
    render(<MapUrlGenerator coordinates={[]} />);

    expect(screen.getByText(/No coordinates available/i)).toBeInTheDocument();
    expect(mapUrlGenerator.generateGoogleMapsUrl).not.toHaveBeenCalled();
    expect(mapUrlGenerator.generateOsrmUrl).not.toHaveBeenCalled();
  });

  test('renders Google Maps and OSRM URLs when multiple coordinates are provided', () => {
    const googleMapsUrl = 'https://www.google.com/maps/dir/40.7308,-73.9973/40.7295,-73.9965';
    const osrmUrl = 'https://map.project-osrm.org/?loc=40.7308%2C-73.9973&loc=40.7295%2C-73.9965';

    (mapUrlGenerator.generateGoogleMapsUrl as any).mockReturnValue(googleMapsUrl);
    (mapUrlGenerator.generateOsrmUrl as any).mockReturnValue(osrmUrl);

    render(<MapUrlGenerator coordinates={testCoordinates} />);

    expect(mapUrlGenerator.generateGoogleMapsUrl).toHaveBeenCalledWith(testCoordinates);
    expect(mapUrlGenerator.generateOsrmUrl).toHaveBeenCalledWith(testCoordinates);

    expect(screen.getByText('Google Maps')).toBeInTheDocument();
    expect(screen.getByText('OSRM')).toBeInTheDocument();

    // Find the URL text displays
    const googleMapsUrlText = screen.getByText(googleMapsUrl);
    const osrmUrlText = screen.getByText(osrmUrl);
    expect(googleMapsUrlText).toBeInTheDocument();
    expect(osrmUrlText).toBeInTheDocument();

    // Find the actual links by their text content
    const googleMapsLink = screen.getByText('Open in Google Maps').closest('a');
    const osrmLink = screen.getByText('Open in OSRM').closest('a');

    expect(googleMapsLink).toBeInTheDocument();
    expect(googleMapsLink?.getAttribute('href')).toBe(googleMapsUrl);

    expect(osrmLink).toBeInTheDocument();
    expect(osrmLink?.getAttribute('href')).toBe(osrmUrl);
  });

  test('renders Google Maps and OpenStreetMap URLs when a single coordinate is provided', () => {
    const googleMapsUrl = 'https://www.google.com/maps/place/40.7308,-73.9973/';
    const osmUrl = 'https://www.openstreetmap.org/search?query=40.7308%2C+-73.9973';

    (mapUrlGenerator.generateGoogleMapsUrl as any).mockReturnValue(googleMapsUrl);
    (mapUrlGenerator.generateOsrmUrl as any).mockReturnValue(osmUrl);

    render(<MapUrlGenerator coordinates={singleCoordinate} />);

    expect(mapUrlGenerator.generateGoogleMapsUrl).toHaveBeenCalledWith(singleCoordinate);
    expect(mapUrlGenerator.generateOsrmUrl).toHaveBeenCalledWith(singleCoordinate);

    expect(screen.getByText('Google Maps')).toBeInTheDocument();
    expect(screen.getByText('OpenStreetMap')).toBeInTheDocument();

    // Find the URL text displays
    const googleMapsUrlText = screen.getByText(googleMapsUrl);
    const osmUrlText = screen.getByText(osmUrl);
    expect(googleMapsUrlText).toBeInTheDocument();
    expect(osmUrlText).toBeInTheDocument();

    // Find the actual links by their text content
    const googleMapsLink = screen.getByText('Open in Google Maps').closest('a');
    const osmLink = screen.getByText('Open in OpenStreetMap').closest('a');

    expect(googleMapsLink).toBeInTheDocument();
    expect(googleMapsLink?.getAttribute('href')).toBe(googleMapsUrl);

    expect(osmLink).toBeInTheDocument();
    expect(osmLink?.getAttribute('href')).toBe(osmUrl);
  });
});
