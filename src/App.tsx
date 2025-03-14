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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex justify-center items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem', display: 'inline-block', verticalAlign: 'middle' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-800">Map URL Generator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Extract coordinates from text and generate map URLs for Google Maps and OpenStreetMap/OSRM.
          </p>
        </header>

        <main className="space-y-8 px-2">
          <CoordinateExtractor onCoordinatesExtracted={handleCoordinatesExtracted} />

          {coordinates.length > 0 && (
            <>
              <MapUrlGenerator coordinates={coordinates} />

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1rem', height: '1rem', display: 'inline-block', verticalAlign: 'middle' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <h2 className="text-xl font-semibold">Extracted Coordinates</h2>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                          Centre
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                          Point
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Coordinates
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Distance from Centre
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {coordinates.map((coord, index) => {
                        const distance = getDistanceFromCenter(coord);
                        const isCenter = centerIndex === index;

                        return (
                          <tr key={index} className={`hover:bg-gray-50 ${isCenter ? 'bg-blue-50' : ''}`}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center justify-center">
                                <input
                                  type="radio"
                                  name="centerPoint"
                                  checked={isCenter}
                                  onChange={() => handleCenterChange(index)}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '0.75rem', height: '0.75rem', display: 'inline-block', verticalAlign: 'middle' }}>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="font-mono">
                                  {coord.latitude.toFixed(6)}, {coord.longitude.toFixed(6)}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {isCenter ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Centre Point
                                </span>
                              ) : (
                                <span className="font-mono text-gray-700">
                                  {formatDistance(distance)}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>

        <footer className="mt-12 text-center text-sm text-gray-500 pb-4">
          <p>Map URL Generator • Made with ❤️ for easy location sharing</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
