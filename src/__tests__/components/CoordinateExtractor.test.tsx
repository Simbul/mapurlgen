import { render, screen, fireEvent } from '@testing-library/react';
import CoordinateExtractor from '../../components/CoordinateExtractor';
import * as coordinateParser from '../../utils/coordinateParser';
import { describe, test, expect, beforeEach, vi } from 'vitest';

// Mock the coordinateParser module
vi.mock('../../utils/coordinateParser');

describe('CoordinateExtractor', () => {
  const mockOnCoordinatesExtracted = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation
    (coordinateParser.extractCoordinates as any).mockReturnValue([]);
  });

  test('renders the textarea and label', () => {
    render(<CoordinateExtractor onCoordinatesExtracted={mockOnCoordinatesExtracted} />);

    expect(screen.getByLabelText(/enter text containing coordinates/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/example:/i)).toBeInTheDocument();
  });

  test('calls extractCoordinates and onCoordinatesExtracted when text changes', () => {
    const mockCoordinates = [
      { latitude: 40.7308, longitude: -73.9973 },
      { latitude: 40.7295, longitude: -73.9965 }
    ];

    (coordinateParser.extractCoordinates as any).mockReturnValue(mockCoordinates);

    render(<CoordinateExtractor onCoordinatesExtracted={mockOnCoordinatesExtracted} />);

    const textarea = screen.getByLabelText(/enter text containing coordinates/i);
    const testText = 'A park located at latitude: 40.7308 and longitude: -73.9973';

    fireEvent.change(textarea, { target: { value: testText } });

    expect(coordinateParser.extractCoordinates).toHaveBeenCalledWith(testText);
    expect(mockOnCoordinatesExtracted).toHaveBeenCalledWith(mockCoordinates);
  });

  test('updates when new text is entered', () => {
    render(<CoordinateExtractor onCoordinatesExtracted={mockOnCoordinatesExtracted} />);

    const textarea = screen.getByLabelText(/enter text containing coordinates/i);
    const testText = 'New text with coordinates';

    fireEvent.change(textarea, { target: { value: testText } });

    expect(textarea).toHaveValue(testText);
  });
});
