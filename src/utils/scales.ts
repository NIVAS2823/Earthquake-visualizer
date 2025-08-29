// src/utils/scales.ts



/**
 * Return Tailwind CSS classes for magnitude-based styling.
 */
export const getMagnitudeColor = (mag: number | null): { bgClass: string; textClass: string } => {
  if (mag === null) return { bgClass: 'bg-gray-100', textClass: 'text-gray-800' };
  if (mag < 3) return { bgClass: 'bg-green-100', textClass: 'text-green-800' };
  if (mag < 5) return { bgClass: 'bg-yellow-100', textClass: 'text-yellow-800' };
  if (mag < 7) return { bgClass: 'bg-orange-100', textClass: 'text-orange-800' };
  return { bgClass: 'bg-red-100', textClass: 'text-red-800' };
};

/**
 * Return circle radius in pixels based on magnitude.
 */
export const getMagRadius = (mag: number | null): number => {
  if (mag === null) return 4;
  return 4 + (mag * 4); // magnitude 1 → 8px, mag 5 → 24px
};