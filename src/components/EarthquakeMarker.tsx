import { CircleMarker, Popup } from 'react-leaflet'
import type { ProcessedEarthquake } from "../types/earthquake";
import { getMagnitudeColor, getMagnitudeRadius, formatMagnitude, formatDepth } from '../utils/mapUtils'

interface EarthquakeMarkerProps {
  earthquake: ProcessedEarthquake
  onClick?: (earthquake: ProcessedEarthquake) => void
}

const EarthquakeMarker = ({ earthquake, onClick }: EarthquakeMarkerProps) => {
  const { coordinates, magnitude, place, time, url, significance } = earthquake
  
  const color = getMagnitudeColor(magnitude)
  const radius = getMagnitudeRadius(magnitude)
  
  const handleClick = () => {
    if (onClick) {
      onClick(earthquake)
    }
  }
  
  // Format time for display
  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
    }
  }
  
  return (
    <CircleMarker
      center={[coordinates.lat, coordinates.lng]}
      radius={radius}
      fillColor={color}
      color="#fff"
      weight={1}
      opacity={0.8}
      fillOpacity={0.7}
      eventHandlers={{
        click: handleClick
      }}
    >
      <Popup>
        <div className="min-w-64 p-2">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-gray-900 leading-tight">
              Magnitude {formatMagnitude(magnitude)}
            </h3>
            <span 
              className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
              style={{ backgroundColor: color }}
              aria-label={`Magnitude ${formatMagnitude(magnitude)} indicator`}
            />
          </div>
          
          <div className="space-y-1 text-sm text-gray-700">
            <div>
              <span className="font-medium">Location:</span> {place}
            </div>
            <div>
              <span className="font-medium">Time:</span> {formatTime(time)}
            </div>
            <div>
              <span className="font-medium">Depth:</span> {formatDepth(coordinates.depth)}
            </div>
            <div>
              <span className="font-medium">Coordinates:</span> {coordinates.lat.toFixed(3)}°, {coordinates.lng.toFixed(3)}°
            </div>
            {significance > 0 && (
              <div>
                <span className="font-medium">Significance:</span> {significance}
              </div>
            )}
          </div>
          
          {url && (
            <div className="mt-3 pt-2 border-t border-gray-200">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View USGS Details →
              </a>
            </div>
          )}
        </div>
      </Popup>
    </CircleMarker>
  )
}

export default EarthquakeMarker