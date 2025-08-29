import MapView from './components/MapView'


function App() {
  return (
    <div className="h-screen w-screen bg-gray-900 text-white">
      <header className="absolute top-0 left-0 right-0 z-10 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-white">
            🌍 Earthquake Visualizer
          </h1>
          <p className="text-sm text-gray-300">
            Real-time seismic activity visualization
          </p>
        </div>
      </header>
      
      <main className="h-full pt-16">
        <MapView />
      </main>
    </div>
  )
}

export default App