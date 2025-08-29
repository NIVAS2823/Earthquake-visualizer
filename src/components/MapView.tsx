// src/components/MapView.tsx

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import { fixLeafletIcons } from '../utils/mapUtils'
import { EarthquakeService } from '../services/earthquakeService'
import type { ProcessedEarthquake, TimeWindow } from "../types/earthquake";
import EarthquakeLayer from './EarthquakeLayer'
import LoadingSkeleton from './LoadingSkeleton'
import ErrorState from './ErrorState'
import EmptyState from './EmptyState'
import ControlsPanel from './ControlsPanel'
import MagnitudeLegend from './MagnitudeLegend'
import AttributionFooter from './AttributionFooter'
import 'leaflet/dist/leaflet.css'
import { TIME_WINDOWS } from '../types/earthquake'
import { getMagnitudeScaleInfo } from '../utils/legendUtils'

// Component to handle map events and setup
const MapController = () => {
  const map = useMap()

  useEffect(() => {
    // Configure map settings
    map.options.worldCopyJump = true
    map.options.maxBounds = L.latLngBounds([-90, -180], [90, 180])

    // Add scale control
    L.control.scale({
      position: 'bottomright',
      metric: true,
      imperial: false
    }).addTo(map)

  }, [map])

  return null
}

const MapView = () => {
  const mapRef = useRef<L.Map>(null)
  const [allEarthquakes, setAllEarthquakes] = useState<ProcessedEarthquake[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('day')
  const [magnitudeFilter, setMagnitudeFilter] = useState(0)
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false)

  // Filter earthquakes based on magnitude
  const filteredEarthquakes = useMemo(() => {
    return allEarthquakes.filter(earthquake => earthquake.magnitude >= magnitudeFilter)
  }, [allEarthquakes, magnitudeFilter])

  // Calculate the highest magnitude for display
  const highestMagnitude = useMemo(() => {
    if (filteredEarthquakes.length === 0) return 0
    return Math.max(...filteredEarthquakes.map(e => e.magnitude))
  }, [filteredEarthquakes])

  // Fetch earthquake data
  const fetchEarthquakes = useCallback(async (window: TimeWindow) => {
    setLoading(true)
    setError(null)

    try {
      const data = await EarthquakeService.fetchEarthquakes(window)
      setAllEarthquakes(data)

      if (data.length === 0) {
        console.log(`No earthquakes found for time window: ${window}`)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch earthquake data'
      if (err instanceof Error && err.name !== "AbortError") {
        setError(errorMessage);
        console.error('Earthquake fetch error:', err);
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Handle time window changes
  const handleTimeWindowChange = useCallback((window: TimeWindow) => {
    setTimeWindow(window)
    fetchEarthquakes(window)
  }, [fetchEarthquakes])

  // Handle magnitude filter changes (debounced in ControlsPanel)
  const handleMagnitudeFilterChange = useCallback((magnitude: number) => {
    setMagnitudeFilter(magnitude)
  }, [])

  // Handle manual refresh
  const handleRefresh = useCallback(() => {
    EarthquakeService.clearCache();
    fetchEarthquakes(timeWindow);
  }, [fetchEarthquakes, timeWindow]);

  // Handle error dismissal
  const handleErrorDismiss = useCallback(() => {
    setError(null)
  }, [])

  // Toggle legend collapse state
  const handleToggleLegend = useCallback(() => {
    setIsLegendCollapsed(prev => !prev)
  }, [])

  // Initial data load
  useEffect(() => {
    fetchEarthquakes(timeWindow)

    // Cleanup on unmount
    return () => {
      EarthquakeService.cancelCurrentRequest()
    }
  }, [fetchEarthquakes, timeWindow])

  // Handle earthquake marker clicks
  const handleEarthquakeClick = useCallback((earthquake: ProcessedEarthquake) => {
    if (mapRef.current) {
      mapRef.current.setView([earthquake.coordinates.lat, earthquake.coordinates.lng], 8, {
        animate: true,
        duration: 1
      })
    }
  }, [])

  useEffect(() => {
    // Fix Leaflet icon paths
    fixLeafletIcons()
  }, [])

  return (
    <div className="h-full w-full relative">
      <MapContainer
        ref={mapRef}
        center={[20, 0]}
        zoom={2}
        minZoom={1}
        maxZoom={18}
        className="h-full w-full rounded-lg"
        zoomControl={false}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        worldCopyJump={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={18}
          tileSize={256}
        />
        <MapController />

        {/* Render filtered earthquake markers */}
        {!loading && !error && filteredEarthquakes.length > 0 && (
          <EarthquakeLayer
            earthquakes={filteredEarthquakes}
            onEarthquakeClick={handleEarthquakeClick}
          />
        )}
      </MapContainer>

      {/* Controls Panel */}
      <ControlsPanel
        timeWindow={timeWindow}
        onTimeWindowChange={handleTimeWindowChange}
        magnitudeFilter={magnitudeFilter}
        onMagnitudeFilterChange={handleMagnitudeFilterChange}
        loading={loading}
        earthquakeCount={allEarthquakes.length}
        filteredCount={filteredEarthquakes.length}
        onRefresh={handleRefresh} // Pass the new handler
      />

      {/* Custom zoom controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-1">
        <button
          onClick={() => mapRef.current?.zoomIn()}
          className="w-8 h-8 bg-white hover:bg-gray-100 border border-gray-300 rounded shadow-md flex items-center justify-center text-gray-700 font-bold transition-colors disabled:opacity-50"
          aria-label="Zoom in"
          disabled={loading}
        >
          +
        </button>
        <button
          onClick={() => mapRef.current?.zoomOut()}
          className="w-8 h-8 bg-white hover:bg-gray-100 border border-gray-300 rounded shadow-md flex items-center justify-center text-gray-700 font-bold transition-colors disabled:opacity-50"
          aria-label="Zoom out"
          disabled={loading}
        >
          −
        </button>
      </div>

      {/* Enhanced Status indicator */}
      {!loading && !error && allEarthquakes.length > 0 && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-black/80 text-white px-3 py-2 rounded-lg shadow-lg">
          <div className="text-sm font-medium">
            {filteredEarthquakes.length} of {allEarthquakes.length} earthquake{allEarthquakes.length !== 1 ? 's' : ''}
          </div>
          <div className="text-xs text-gray-300">
            {TIME_WINDOWS[timeWindow].label}
            {magnitudeFilter > 0 && ` • Magnitude ≥ ${magnitudeFilter.toFixed(1)}`}
          </div>
          {highestMagnitude > 0 && (
            <div className="text-xs text-yellow-300 mt-1">
              Highest Magnitude: {highestMagnitude.toFixed(1)} ({getMagnitudeScaleInfo(highestMagnitude).description})
            </div>
          )}
        </div>
      )}

      {/* Render UX States */}
      {loading && <LoadingSkeleton />}
      {error && !loading && (
        <ErrorState
          error={error}
          onRetry={() => fetchEarthquakes(timeWindow)}
          onDismiss={handleErrorDismiss}
        />
      )}

      {!loading && !error && allEarthquakes.length === 0 && (
        <EmptyState
          timeWindow={timeWindow}
          onRefresh={() => fetchEarthquakes(timeWindow)}
          onChangeTimeWindow={handleTimeWindowChange}
        />
      )}

      {/* New Components */}
      <div className="flex flex-col-reverse md:flex-row-reverse items-end md:items-end justify-end md:justify-end gap-2 absolute bottom-4 right-4 z-[1000]">
        <AttributionFooter />
        <MagnitudeLegend
          isCollapsed={isLegendCollapsed}
          onToggle={handleToggleLegend}
        />
      </div>
    </div>
  )
}

export default MapView