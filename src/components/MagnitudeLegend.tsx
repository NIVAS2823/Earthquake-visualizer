import React from 'react';
import { getMagnitudeColor } from '../utils/scales';

interface MagnitudeLegendProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const MagnitudeLegend: React.FC<MagnitudeLegendProps> = ({ isCollapsed, onToggle }) => {
  const magnitudes = [
    { label: '< 3.0', mag: 2.9 },
    { label: '3.0 - 4.9', mag: 4.0 },
    { label: '5.0 - 6.9', mag: 6.0 },
    { label: '7.0+', mag: 7.5 },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold text-gray-800">Magnitude Legend</h3>
        <button
          onClick={onToggle}
          className="text-xs text-blue-600 hover:underline"
        >
          {isCollapsed ? "Show" : "Hide"}
        </button>
      </div>

      {!isCollapsed && (
        <ul className="space-y-1">
          {magnitudes.map((item, index) => {
            const { bgClass } = getMagnitudeColor(item.mag);
            return (
              <li key={index} className="flex items-center space-x-2">
                <span
                  className={`w-4 h-4 rounded-full ${bgClass}`}
                  aria-hidden="true"
                ></span>
                <span className="text-sm text-gray-700">{item.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MagnitudeLegend;
