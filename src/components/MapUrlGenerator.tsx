import React from 'react';
import { Coordinate } from '../utils/types';
import { generateGoogleMapsUrl, generateOsrmUrl } from '../utils/mapUrlGenerator';

interface MapUrlGeneratorProps {
  coordinates: Coordinate[];
}

const MapUrlGenerator: React.FC<MapUrlGeneratorProps> = ({ coordinates }) => {
  if (coordinates.length < 2) {
    return (
      <div className="text-yellow-600 bg-yellow-50 p-4 rounded-md">
        At least two coordinates are needed to generate a route.
      </div>
    );
  }

  const googleMapsUrl = generateGoogleMapsUrl(coordinates);
  const osrmUrl = generateOsrmUrl(coordinates);

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
            <button
              onClick={() => navigator.clipboard.writeText(googleMapsUrl)}
              className="ml-2 p-2 text-gray-500 hover:text-gray-700"
              title="Copy to clipboard"
            >
              📋
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-md p-4">
          <h3 className="font-medium mb-2">OSRM</h3>
          <div className="flex items-center">
            <a
              href={osrmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 break-all"
            >
              {osrmUrl}
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(osrmUrl)}
              className="ml-2 p-2 text-gray-500 hover:text-gray-700"
              title="Copy to clipboard"
            >
              📋
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapUrlGenerator;
