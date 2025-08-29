const LoadingSkeleton = () => {
  return (
    <div className="absolute inset-0 z-[1000] bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-gray-900">Loading Earthquake Data</h3>
          <p className="text-sm text-gray-600">Fetching latest seismic activity from USGS...</p>
        </div>
        
        {/* Skeleton content */}
        <div className="mt-4 space-y-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/5" />
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton