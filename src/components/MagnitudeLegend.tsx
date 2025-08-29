import { getMagnitudeColor } from '../utils/mapUtils'

interface MagnitudeLegendProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

const MagnitudeLegend = ({ isCollapsed = false, onToggle }: MagnitudeLegendProps) => {
  const magnitudeRanges = [
    { min: 7, max: 10, label: '7.0+', description: 'Major' },
    { min: 6, max: 6.9, label: '6.0-6.9', description: 'Strong' },
    { min: 5, max: 5.9, label: '5.0-5.9', description: 'Moderate' },
    { min: 4, max: 4.9, label: '4.0-4.9', description: 'Light' },
    { min: 3, max: 3.9, label: '3.0-3.9', description: 'Minor' },
    { min: 2, max: 2.9, label: '2.0-2.9', description: 'Very Minor' },
    { min: 0, max: 1.9, label: '0.0-1.9', description: 'Micro' }
  ]

  return (
    <div className="absolute bottom-4 right-4 z-[1000] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div 
        className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">Magnitude Scale</span>
          <div className="flex gap-1">
            {magnitudeRanges.slice(0, 4).map((range, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getMagnitudeColor(range.min + 0.5) }}
              />
            ))}
          </div>
        </div>
        {onToggle && (
          <span className={`text-xs text-gray-500 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`}>
            ▼
          </span>
        )}
      </div>
      
      {/* Legend Content */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'}`}>
        <div className="p-3 space-y-2 max-w-48">
          {magnitudeRanges.map((range, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div
                  className="w-4 h-4 rounded-full border border-gray-300 shadow-sm flex-shrink-0"
                  style={{ backgroundColor: getMagnitudeColor(range.min + 0.5) }}
                />
                <div className="min-w-0">
                  <div className="text-xs font-medium text-gray-900">
                    {range.label}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {range.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MagnitudeLegend