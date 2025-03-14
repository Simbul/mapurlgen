# Map URL Generator

A simple web application that extracts coordinates from text and generates map URLs for navigation.

This is currently live at https://simbul.github.io/mapurlgen/

## Features

- Extract coordinates from text in the format "latitude: X, longitude: Y"
- Generate Google Maps and OSRM (Open Source Routing Machine) URLs for navigation
- Calculate distances between coordinates using the Haversine formula
- Copy URLs to clipboard with a single click
- Responsive design with TailwindCSS and DaisyUI

## Technologies Used

- React 19
- TypeScript
- Vite
- TailwindCSS with DaisyUI
- Vitest for testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter text containing coordinates in the format "latitude: X, longitude: Y"
2. The application will automatically extract the coordinates
3. If at least two coordinates are found, map URLs will be generated
4. The application will calculate distances between consecutive coordinates
5. Click on a URL to open it in a new tab, or click the clipboard icon to copy it

## Example Input

```
A park located at latitude: 40.7308 and longitude: -73.9973, near the NYU campus (latitude: 40.7295, longitude: -73.9965)
```

This will extract the coordinates:
- 40.7308, -73.9973
- 40.7295, -73.9965

And generate URLs for Google Maps and OSRM, along with the distance between these points.

## Running Tests

```
npm test
```

For watch mode:
```
npm run test:watch
```

## Building for Production

```
npm run build
```

## Project Structure

- `src/components/` - React components
  - `CoordinateExtractor.tsx` - Component for extracting coordinates from text
  - `MapUrlGenerator.tsx` - Component for generating map URLs
- `src/utils/` - Utility functions
  - `coordinateParser.ts` - Functions for parsing coordinates from text
  - `mapUrlGenerator.ts` - Functions for generating map URLs
  - `distanceCalculator.ts` - Functions for calculating distances between coordinates
  - `types.ts` - TypeScript type definitions
- `src/__tests__/` - Test files

## AI code generation

This project was mostly generated using Cursor, with a few human fixes thrown in and some support from old-school tutorials on the Internet :D

## License

MIT
