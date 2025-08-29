// src/components/MapBounds.tsx

import { useMapEvents } from "react-leaflet";
import L from "leaflet";

const worldBounds = L.latLngBounds([-90, -180], [90, 180]);

const MapBounds = () => {
  const map = useMapEvents({
    zoomend: () => {
      // Check if the current zoom level is at or below a certain threshold
      // and reset the view if it's outside the world bounds.
      if (!map.getBounds().intersects(worldBounds)) {
        map.fitBounds(worldBounds);
      }
    },
  });

  return null;
};

export default MapBounds;