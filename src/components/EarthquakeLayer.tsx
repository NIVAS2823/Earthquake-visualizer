import type { ProcessedEarthquake } from "../types/earthquake";
import EarthquakeMarker from './EarthquakeMarker'

interface EarthquakeLayerProps {
  earthquakes: ProcessedEarthquake[]
  onEarthquakeClick?: (earthquake: ProcessedEarthquake) => void
}

const EarthquakeLayer = ({ earthquakes, onEarthquakeClick }: EarthquakeLayerProps) => {
  return (
    <>
      {earthquakes.map(earthquake => (
        <EarthquakeMarker
          key={earthquake.id}
          earthquake={earthquake}
          onClick={onEarthquakeClick}
        />
      ))}
    </>
  )
}

export default EarthquakeLayer