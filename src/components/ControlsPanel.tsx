// src/components/ControlsPanel.tsx

import { useState, useEffect } from 'react'
import { TIME_WINDOWS } from '../types/earthquake'
import type { TimeWindow } from '../types/earthquake'

interface ControlsPanelProps {
  timeWindow: TimeWindow
  onTimeWindowChange: (window: TimeWindow) => void
  magnitudeFilter: number
  onMagnitudeFilterChange: (magnitude: number) => void
  loading: boolean
  earthquakeCount: number
  filteredCount: number
  onRefresh: () => void; // New prop for the refresh button
}

const ControlsPanel = ({
  timeWindow,
  onTimeWindowChange,
  magnitudeFilter,
  onMagnitudeFilterChange,
  loading,
  earthquakeCount,
  filteredCount,
  onRefresh // Destructure new prop
}: ControlsPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [localMagnitude, setLocalMagnitude] = useState(magnitudeFilter)

  // Debounce magnitude filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      onMagnitudeFilterChange(localMagnitude)
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [localMagnitude, onMagnitudeFilterChange])

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-20 left-4 z-[1001] bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-lg px-3 py-2 text-gray-700 font-medium transition-all duration-200 flex items-center gap-2"
        aria-label={isExpanded ? 'Hide controls' : 'Show controls'}
      >
        <span className="text-lg">⚙️</span>
        <span className="hidden sm:inline">Controls</span>
        <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Controls Panel */}
      <div className={`absolute top-36 left-4 z-[1001] bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 ${
        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        <div className="p-4 space-y-4 w-72">
          {/* Time Window Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(TIME_WINDOWS) as TimeWindow[]).map(window => (
                <button
                  key={window}
                  onClick={() => onTimeWindowChange(window)}
                  disabled={loading}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    window === timeWindow
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                  }`}
                >
                  {TIME_WINDOWS[window].label}
                </button>
              ))}
            </div>
          </div>

          {/* Magnitude Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Magnitude: {localMagnitude.toFixed(1)}
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="8"
                step="0.1"
                value={localMagnitude}
                onChange={(e) => setLocalMagnitude(Number(e.target.value))}
                disabled={loading}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0.0</span>
                <span>2.0</span>
                <span>4.0</span>
                <span>6.0</span>
                <span>8.0+</span>
              </div>
            </div>
          </div>

          {/* Quick Magnitude Presets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Filters
            </label>
            <div className="grid grid-cols-3 gap-1">
              {[
                { value: 0, label: 'All', color: 'bg-gray-100' },
                { value: 2.5, label: '2.5+', color: 'bg-yellow-100' },
                { value: 4.0, label: '4.0+', color: 'bg-orange-100' },
                { value: 5.0, label: '5.0+', color: 'bg-red-100' },
                { value: 6.0, label: '6.0+', color: 'bg-red-200' },
                { value: 7.0, label: '7.0+', color: 'bg-red-300' }
              ].map(preset => (
                <button
                  key={preset.value}
                  onClick={() => setLocalMagnitude(preset.value)}
                  disabled={loading}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors disabled:opacity-50 ${
                    Math.abs(localMagnitude - preset.value) < 0.1
                      ? 'bg-blue-600 text-white'
                      : `${preset.color} hover:bg-gray-200 text-gray-700`
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Refresh Button */}
          <div className="pt-3 border-t border-gray-200">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Refresh Data
            </button>
          </div>

          {/* Statistics */}
          <div className="pt-3 border-t border-gray-200">
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex justify-between">
                <span>Total earthquakes:</span>
                <span className="font-medium">{earthquakeCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Shown on map:</span>
                <span className="font-medium text-blue-600">{filteredCount}</span>
              </div>
              {magnitudeFilter > 0 && (
                <div className="text-orange-600">
                  Filtered by magnitude ≥ {magnitudeFilter.toFixed(1)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ControlsPanel