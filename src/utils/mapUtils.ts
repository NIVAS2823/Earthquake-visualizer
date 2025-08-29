import L from 'leaflet'

// Fix for default markers in react-leaflet
// This ensures marker icons display correctly
export const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })
}

// Utility functions for earthquake visualization
export const getMagnitudeColor = (magnitude: number): string => {
  if (magnitude >= 7) return '#8b0000' // Dark red - Major
  if (magnitude >= 6) return '#ff0000' // Red - Strong
  if (magnitude >= 5) return '#ff4500' // Orange red - Moderate
  if (magnitude >= 4) return '#ffa500' // Orange - Light
  if (magnitude >= 3) return '#ffff00' // Yellow - Minor
  if (magnitude >= 2) return '#9acd32' // Yellow green - Very minor
  return '#00ff00' // Green - Micro
}

export const getMagnitudeRadius = (magnitude: number): number => {
  // Scale radius between 3-20 pixels based on magnitude
  const minRadius = 3
  const maxRadius = 20
  const minMag = 0
  const maxMag = 10
  
  const scaledRadius = minRadius + ((magnitude - minMag) / (maxMag - minMag)) * (maxRadius - minRadius)
  return Math.max(minRadius, Math.min(maxRadius, scaledRadius))
}

export const formatMagnitude = (mag: number): string => {
  return mag.toFixed(1)
}

export const formatDepth = (depth: number): string => {
  return `${depth.toFixed(1)} km`
}