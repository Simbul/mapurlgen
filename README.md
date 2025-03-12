# Map URL Generator

A simple web application that extracts coordinates from text and generates map URLs for navigation.

## Features

- Extract coordinates from text in the format "latitude: X, longitude: Y"
- Generate Google Maps and OSRM (Open Source Routing Machine) URLs for navigation
- Copy URLs to clipboard with a single click
- Responsive design with TailwindCSS

## Technologies Used

- React
- TypeScript
- TailwindCSS
- Jest for testing

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
4. Click on a URL to open it in a new tab, or click the clipboard icon to copy it

## Example Input

```
A park located at latitude: 40.7308 and longitude: -73.9973, near the NYU campus (latitude: 40.7295, longitude: -73.9965)
```

This will extract the coordinates:
- 40.7308, -73.9973
- 40.7295, -73.9965

And generate URLs for Google Maps and OSRM.

## Running Tests

```
npm test
```

## Project Structure

- `src/components/` - React components
- `src/utils/` - Utility functions for parsing coordinates and generating URLs
- `src/__tests__/` - Test files

## License

MIT
