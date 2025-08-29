🌍 Earthquake Visualizer
A real-time web application for visualizing global seismic activity. This project allows users to explore recent earthquakes on an interactive map, filter them by time and magnitude, and get detailed information about each event. The application is built with a focus on a clean user interface, a great user experience, and robust performance.

✨ Features
Interactive Map: Displays recent earthquake data on a global map using the Leaflet library.

Real-Time Data: Fetches up-to-date earthquake information from the USGS Earthquake API.

Time Filtering: Users can filter earthquakes by a specific time window: past hour, 24 hours, 7 days, or 30 days.

Magnitude Filtering: A slider and quick presets allow users to filter earthquakes by their minimum magnitude.

Marker Clustering: Utilizes a marker cluster library to efficiently handle large numbers of data points, improving map performance and clarity.

Detailed Information: Clicking on a marker or a list item reveals a popup with details about the earthquake, including location, magnitude, and time.

Responsive Design: The application is fully responsive, offering a seamless experience on both desktop and mobile devices. On mobile, the controls and list are accessible via a slide-up panel.

Performance Optimization: Employs React's useMemo and useCallback hooks to prevent unnecessary re-renders, ensuring a smooth and performant user experience, especially with data-heavy operations.

Accessibility (a11y): Implemented with a focus on accessibility, including proper aria attributes for screen readers and improved keyboard navigation.

💻 Technology Stack
Framework: React (with Vite for fast development)

State Management: React's built-in state management (useState, useEffect)

Styling: Tailwind CSS for rapid and utility-first styling

Mapping: Leaflet with the react-leaflet and leaflet.markercluster libraries

Data Fetching: Standard JavaScript fetch API

🚀 How to Run Locally
Prerequisites
Make sure you have Node.js and npm (or yarn/pnpm) installed.

Installation
Clone the repository:

Bash

git clone https://github.com/your-username/earthquake-visualizer.git
cd earthquake-visualizer
Install the dependencies:

Bash

npm install
Running the Application
Start the development server:

Bash

npm run dev
Open your browser and navigate to the URL provided in the terminal (usually http://localhost:5173).

🛠️ Project Structure
The project follows a standard component-based architecture for better maintainability and scalability.

src/
┣ assets
┣ components/
┃ ┣ AttributionFooter.tsx
┃ ┣ ControlsPanel.tsx
┃ ┣ EarthquakeLayer.tsx
┃ ┣ EarthquakeMarker.tsx
┃ ┣ EmptyState.tsx
┃ ┣ ErrorState.tsx
┃ ┣ LoadingSkeleton.tsx
┃ ┣ MagnitudeLegend.tsx
┃ ┣ MapBounds.tsx
┃ ┗ MapView.tsx
┣ hooks/
┃ ┗ useDebouncedValue.ts
┣ services/
┃ ┗ earthquakeService.ts
┣ types/
┃ ┗ earthquake.ts
┣ utils/
┃ ┣ legendUtils.ts
┃ ┣ mapUtils.ts
┃ ┗ scales.ts
┣ App.css
┣ App.tsx
┣ index.css
┣ main.tsx
┗ vite-env.d.ts
└── index.css


src/components: Contains all the reusable UI components.

src/hooks: Custom React hooks for shared logic, such as debouncing.

src/services: Handles all external API calls and data fetching logic.

src/types: TypeScript definitions for a more robust and type-safe codebase.

src/utils: Helper functions for things like color scales and data formatting.

src/App.tsx: The main component that orchestrates all other components and manages the primary application state.

📄 License
This project is open-source and available under the MIT License.

👤 Author
Nivas Mididhodi - https://github.com/NIVAS2823/