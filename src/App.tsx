import { useState } from 'react';
import './App.css';
import CoordinateExtractor from './components/CoordinateExtractor';
import MapUrlGenerator from './components/MapUrlGenerator';
import { Coordinate } from './utils/types';

function App() {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  const handleCoordinatesExtracted = (extractedCoordinates: Coordinate[]) => {
    setCoordinates(extractedCoordinates);
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
              <h2 className="text-xl font-semibold mb-4">Extracted Coordinates</h2>
              <ul className="mb-6 space-y-2">
                {coordinates.map((coord, index) => (
                  <li key={index} className="bg-gray-50 p-2 rounded">
                    Point {index + 1}: {coord.latitude}, {coord.longitude}
                  </li>
                ))}
              </ul>

              <MapUrlGenerator coordinates={coordinates} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
