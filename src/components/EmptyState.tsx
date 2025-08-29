import type  { TimeWindow } from '../types/earthquake'
import { TIME_WINDOWS } from '../types/earthquake'

interface EmptyStateProps {
  timeWindow: TimeWindow
  onRefresh: () => void
  onChangeTimeWindow: (window: TimeWindow) => void
}

const EmptyState = ({ timeWindow, onRefresh, onChangeTimeWindow }: EmptyStateProps) => {
  const currentWindowLabel = TIME_WINDOWS[timeWindow].label.toLowerCase()
  
  return (
    <div className="absolute inset-0 z-[1000] bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto text-center">
        <div className="mb-4">
          <span className="text-6xl">🌍</span>
        </div>
        
        <h3 className="font-semibold text-gray-900 text-lg mb-2">
          No Earthquakes Found
        </h3>
        
        <p className="text-gray-600 mb-4">
          No earthquake activity detected in the {currentWindowLabel}.
          This could mean it's been a quiet period seismically.
        </p>
        
        <div className="space-y-3">
          <div className="text-sm text-gray-500">
            Try a different time window:
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {(Object.keys(TIME_WINDOWS) as TimeWindow[]).map(window => (
              <button
                key={window}
                onClick={() => onChangeTimeWindow(window)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  window === timeWindow
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                }`}
              >
                {TIME_WINDOWS[window].label}
              </button>
            ))}
          </div>
          
          <div className="pt-2">
            <button
              onClick={onRefresh}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Refresh Data
            </button>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Data updates every few minutes from USGS
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmptyState