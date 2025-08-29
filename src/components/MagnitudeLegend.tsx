// src/components/MagnitudeLegend.tsx

import React from 'react';
import { getMagnitudeColor } from '../utils/scales';

const MagnitudeLegend: React.FC = () => {
  const magnitudes = [
    { label: '< 3.0', mag: 2.9 },
    { label: '3.0 - 4.9', mag: 4.0 },
    { label: '5.0 - 6.9', mag: 6.0 },
    { label: '7.0+', mag: 7.5 },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h3 className="text-sm font-bold text-gray-800 mb-2">Magnitude Legend</h3>
      <ul className="space-y-1">
        {magnitudes.map((item, index) => {
          const { bgClass, textClass } = getMagnitudeColor(item.mag);
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
    </div>
  );
};

export default MagnitudeLegend;