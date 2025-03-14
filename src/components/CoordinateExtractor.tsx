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
  }, [inputText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleClearText = () => {
    setInputText('');
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-0">
        <div className="p-4 border-b border-base-200 bg-base-200 flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1rem', height: '1rem', display: 'inline-block', verticalAlign: 'middle' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <label htmlFor="coordinate-input" className="font-medium">Enter text containing coordinates</label>
          </div>
        </div>

        <div className="p-4">
          <div className="relative w-full">
            <textarea
              id="coordinate-input"
              className="textarea textarea-bordered w-full text-base"
              style={{ height: '200px', minHeight: '200px', width: '100%' }}
              placeholder="Example: A park located at latitude: 40.7308 and longitude: -73.9973, near the NYU campus (latitude: 40.7295, longitude: -73.9965)"
              value={inputText}
              onChange={handleTextChange}
            />
            {inputText && (
              <button
                onClick={handleClearText}
                className="btn btn-circle btn-ghost btn-sm absolute top-2 right-2"
                title="Clear text"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '0.75rem', height: '0.75rem', display: 'inline-block', verticalAlign: 'middle' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setInputText('Exploring Greenwich Village, New York City\n==================================\n\nMorning Walk: Washington Square Park Area\n-------------------\nStarted my day at Washington Square Park located at latitude: 40.7308 and longitude: -73.9973.\nThe iconic arch was beautiful! Later, I walked to the nearby NYU campus (latitude: 40.7295, longitude: -73.9965)\nfor a quick coffee.')}
              className="btn btn-sm btn-ghost"
            >
              Sample Text 1
            </button>
            <button
              onClick={() => setInputText('Lunch Break: West Village\n-------------------\nFound a charming café for lunch.\nLocation details:\n  - latitude: 40.7352\n  - longitude: -74.0031')}
              className="btn btn-sm btn-ghost"
            >
              Sample Text 2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinateExtractor;
