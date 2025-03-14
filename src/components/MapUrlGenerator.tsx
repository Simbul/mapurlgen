import React from 'react';
import { Coordinate } from '../utils/types';
import { generateGoogleMapsUrl, generateOsrmUrl } from '../utils/mapUrlGenerator';

interface MapUrlGeneratorProps {
  coordinates: Coordinate[];
}

const MapUrlGenerator: React.FC<MapUrlGeneratorProps> = ({ coordinates }) => {
  if (coordinates.length === 0) {
    return (
      <div className="text-yellow-600 bg-yellow-50 p-4 rounded-md">
        No coordinates available to generate map URLs.
      </div>
    );
  }

  const googleMapsUrl = generateGoogleMapsUrl(coordinates);
  const osrmUrl = generateOsrmUrl(coordinates);

  // Display different messages based on number of coordinates
  const urlTypeDescription = coordinates.length === 1
    ? "location"
    : "route";

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Map URLs</h2>

      <div className="space-y-3">
        <div className="border border-gray-200 rounded-md p-4">
          <h3 className="font-medium mb-2">Google Maps</h3>
          <div className="flex items-center">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 break-all"
            >
              {googleMapsUrl}
            </a>
          </div>
        </div>

        <div className="border border-gray-200 rounded-md p-4">
          <h3 className="font-medium mb-2">{coordinates.length === 1 ? "OpenStreetMap" : "OSRM"}</h3>
          <div className="flex items-center">
            <a
              href={osrmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 break-all"
            >
              {osrmUrl}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapUrlGenerator;
