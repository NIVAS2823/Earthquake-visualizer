interface ErrorStateProps {
  error: string
  onRetry: () => void
  onDismiss: () => void
}

const ErrorState = ({ error, onRetry, onDismiss }: ErrorStateProps) => {
  const isNetworkError = error.toLowerCase().includes('network') || error.toLowerCase().includes('fetch')
  const isServerError = error.includes('HTTP error')
  
  const getErrorDetails = () => {
    if (isNetworkError) {
      return {
        title: 'Connection Issue',
        description: 'Unable to connect to earthquake data service. Please check your internet connection.',
        suggestion: 'Try refreshing or check back in a few minutes.'
      }
    }
    
    if (isServerError) {
      return {
        title: 'Service Unavailable',
        description: 'The USGS earthquake service is temporarily unavailable.',
        suggestion: 'This usually resolves quickly. Please try again in a few moments.'
      }
    }
    
    return {
      title: 'Data Error',
      description: error,
      suggestion: 'Please try refreshing the data.'
    }
  }
  
  const { title, description, suggestion } = getErrorDetails()
  
  return (
    <div className="absolute inset-0 z-[1000] bg-gray-900/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <p className="text-sm text-gray-500">{suggestion}</p>
        </div>
        
        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
          <button
            onClick={onDismiss}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Dismiss
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            Data provided by USGS Earthquake Hazards Program
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorState