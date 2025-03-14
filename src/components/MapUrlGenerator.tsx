import React from 'react';
import { Coordinate } from '../utils/types';
import { generateGoogleMapsUrl, generateOsrmUrl } from '../utils/mapUrlGenerator';

interface MapUrlGeneratorProps {
  coordinates: Coordinate[];
}

interface CopyButtonProps {
  onClick: () => void;
  title: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-circle"
      title={title}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </button>
  );
};

const MapUrlGenerator: React.FC<MapUrlGeneratorProps> = ({ coordinates }) => {
  if (coordinates.length === 0) {
    return (
      <div className="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-warning mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1rem', height: '1rem', display: 'inline-block', verticalAlign: 'middle' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>No coordinates available to generate map URLs.</span>
      </div>
    );
  }

  const googleMapsUrl = generateGoogleMapsUrl(coordinates);
  const osrmUrl = generateOsrmUrl(coordinates);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold">Map URLs</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Google Maps Card */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200">
          <div className="card-body p-0">
            <div className="p-4 border-b border-base-200 bg-base-200 flex items-center">
              <svg className="h-4 w-4 text-error mr-2" viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem', display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <h3 className="font-medium">Google Maps</h3>
            </div>
            <div className="p-4">
              <div className="mb-3 text-sm text-base-content/70 truncate">
                {googleMapsUrl}
              </div>
              <div className="flex space-x-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '0.75rem', height: '0.75rem', display: 'inline-block', verticalAlign: 'middle' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open in Google Maps
                </a>
                <CopyButton
                  onClick={() => copyToClipboard(googleMapsUrl)}
                  title="Copy URL"
                />
              </div>
            </div>
          </div>
        </div>

        {/* OSRM/OpenStreetMap Card */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200">
          <div className="card-body p-0">
            <div className="p-4 border-b border-base-200 bg-base-200 flex items-center">
              <svg className="h-4 w-4 text-primary mr-2" viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem', display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              <h3 className="font-medium">{coordinates.length === 1 ? "OpenStreetMap" : "OSRM"}</h3>
            </div>
            <div className="p-4">
              <div className="mb-3 text-sm text-base-content/70 truncate">
                {osrmUrl}
              </div>
              <div className="flex space-x-2">
                <a
                  href={osrmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '0.75rem', height: '0.75rem', display: 'inline-block', verticalAlign: 'middle' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open in {coordinates.length === 1 ? "OpenStreetMap" : "OSRM"}
                </a>
                <CopyButton
                  onClick={() => copyToClipboard(osrmUrl)}
                  title="Copy URL"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapUrlGenerator;
