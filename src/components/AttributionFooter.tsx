import { useState } from 'react'

const AttributionFooter = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="absolute bottom-20 right-4 z-[999]">
      {/* Compact Attribution */}
      <div className="bg-black/80 text-white text-xs rounded-lg overflow-hidden shadow-lg">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-3 py-2 hover:bg-black/90 transition-colors flex items-center justify-between gap-2"
        >
          <span>Data & Map Sources</span>
          <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {/* Expanded Attribution */}
        <div className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-3 py-3 space-y-3 border-t border-gray-600 bg-black/90 max-w-80">
            {/* Earthquake Data Attribution */}
            <div>
              <div className="font-medium text-yellow-400 mb-1">Earthquake Data</div>
              <div className="text-gray-300">
                Provided by the{' '}
                <a
                  href="https://earthquake.usgs.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  U.S. Geological Survey
                </a>
              </div>
              <div className="text-gray-400 text-xs mt-1">
                Updates every few minutes • Public domain
              </div>
            </div>
            
            {/* Map Data Attribution */}
            <div>
              <div className="font-medium text-green-400 mb-1">Map Data</div>
              <div className="text-gray-300">
                © {' '}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  OpenStreetMap
                </a>
                {' '} contributors
              </div>
              <div className="text-gray-400 text-xs mt-1">
                Open data licensed under ODbL
              </div>
            </div>
            
            {/* App Info */}
            <div>
              <div className="font-medium text-purple-400 mb-1">About</div>
              <div className="text-gray-300 text-xs">
                Built for educational visualization of global seismic activity. 
                Data is for informational purposes only.
              </div>
            </div>
            
            {/* Links */}
            <div className="pt-2 border-t border-gray-600">
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  USGS API Docs
                </a>
                <span className="text-gray-500">•</span>
                <a
                  href="https://earthquake.usgs.gov/learn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Learn About Earthquakes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttributionFooter