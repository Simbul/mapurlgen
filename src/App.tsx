import { useState, useEffect } from 'react';
import './App.css';
import CoordinateExtractor from './components/CoordinateExtractor';
import MapUrlGenerator from './components/MapUrlGenerator';
import { Coordinate } from './utils/types';
import { calculateHaversineDistance } from './utils/distanceCalculator';

function App() {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [centerIndex, setCenterIndex] = useState<number | null>(null);

  // Update centerIndex when coordinates change in a way that would make the current selection invalid
  useEffect(() => {
    // If there are coordinates but no center is selected, select the last one
    if (coordinates.length > 0 && (centerIndex === null || centerIndex >= coordinates.length)) {
      setCenterIndex(coordinates.length - 1);
    } else if (coordinates.length === 0) {
      setCenterIndex(null);
    }
  }, [coordinates, centerIndex]);

  const handleCoordinatesExtracted = (extractedCoordinates: Coordinate[]) => {
    setCoordinates(extractedCoordinates);
    // We no longer set centerIndex here, it's handled by the useEffect
  };

  // Handler for radio button changes
  const handleCenterChange = (index: number) => {
    setCenterIndex(index);
  };

  // Calculate distance from center point
  const getDistanceFromCenter = (coord: Coordinate): number | null => {
    if (centerIndex === null || coordinates.length === 0) {
      return null;
    }

    const centerCoord = coordinates[centerIndex];
    return calculateHaversineDistance(coord, centerCoord);
  };

  // Format distance for display
  const formatDistance = (distance: number | null): string => {
    if (distance === null) return '';

    // If distance is less than 1 meter, show as 0m
    if (distance < 1) return '0m';

    // Round to nearest meter
    return `${Math.round(distance)}m`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Map URL Generator</h1>
          <p className="text-gray-600">
            Enter text containing coordinates to generate map URLs
          </p>
        </header>

        <main className="bg-white rounded-lg shadow-md p-6">
          <CoordinateExtractor onCoordinatesExtracted={handleCoordinatesExtracted} />

          {coordinates.length > 0 && (
            <div className="mt-8">
              <MapUrlGenerator coordinates={coordinates} />

              <h2 className="text-xl font-semibold mb-4">Extracted Coordinates</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 border-b text-left">Centre</th>
                      <th className="py-2 px-4 border-b text-left">Point</th>
                      <th className="py-2 px-4 border-b text-left">Coordinates</th>
                      <th className="py-2 px-4 border-b text-left">Distance from Centre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coordinates.map((coord, index) => {
                      const distance = getDistanceFromCenter(coord);
                      const isCenter = centerIndex === index;

                      return (
                        <tr key={index} className={`hover:bg-gray-50 ${isCenter ? 'bg-blue-50' : ''}`}>
                          <td className="py-2 px-4 border-b">
                            <input
                              type="radio"
                              name="centerPoint"
                              checked={isCenter}
                              onChange={() => handleCenterChange(index)}
                              className="form-radio h-4 w-4 text-blue-600"
                            />
                          </td>
                          <td className="py-2 px-4 border-b">
                            {index + 1}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {coord.latitude}, {coord.longitude}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {isCenter ?
                              <span className="font-semibold text-blue-600">Centre</span> :
                              formatDistance(distance)
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>

        <code>
          Exploring Greenwich Village, New York City
          ==================================

          Morning Walk: Washington Square Park Area
          -------------------
          Started my day at Washington Square Park located at latitude: 40.7308 and longitude: -73.9973.
          The iconic arch was beautiful! Later, I walked to the nearby NYU campus (latitude: 40.7295, longitude: -73.9965)
          for a quick coffee.

          Lunch Break: West Village
          -------------------
          Found a charming café for lunch.
          Location details:
            - latitude: 40.7352
            - longitude: -74.0031
        </code>
      </div>
    </div>
  );
}

export default App;
