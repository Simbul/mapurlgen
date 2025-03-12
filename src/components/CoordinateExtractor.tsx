import React, { useState, useEffect } from 'react';
import { extractCoordinates } from '../utils/coordinateParser';
import { Coordinate } from '../utils/types';

interface CoordinateExtractorProps {
  onCoordinatesExtracted: (coordinates: Coordinate[]) => void;
}

const CoordinateExtractor: React.FC<CoordinateExtractorProps> = ({ onCoordinatesExtracted }) => {
  const [inputText, setInputText] = useState<string>('');

  useEffect(() => {
    const coordinates = extractCoordinates(inputText);
    onCoordinatesExtracted(coordinates);
  }, [inputText, onCoordinatesExtracted]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="coordinate-input" className="block text-sm font-medium text-gray-700 mb-2">
        Enter text containing coordinates
      </label>
      <textarea
        id="coordinate-input"
        className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Example: A park located at latitude: 40.7308 and longitude: -73.9973, near the NYU campus (latitude: 40.7295, longitude: -73.9965)"
        value={inputText}
        onChange={handleTextChange}
      />
      <p className="mt-2 text-sm text-gray-500">
        The app will automatically extract coordinates in the format "latitude: X, longitude: Y"
      </p>
    </div>
  );
};

export default CoordinateExtractor;
