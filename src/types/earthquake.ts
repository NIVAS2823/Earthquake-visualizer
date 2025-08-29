// src/types/earthquake.ts

// Type definitions for USGS Earthquake GeoJSON API

export interface EarthquakeProperties {
  mag: number | null;
  place: string | null;
  time: number;
  updated: number;
  tz: number | null;
  url: string;
  detail: string;
  felt: number | null;
  cdi: number | null;
  mmi: number | null;
  alert: string | null;
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst: number | null;
  dmin: number | null;
  rms: number | null;
  gap: number | null;
  magType: string | null;
  type: string;
  title: string;
}

export interface EarthquakeGeometry {
  type: "Point";
  coordinates: [longitude: number, latitude: number, depth: number];
}

export interface EarthquakeFeature {
  type: "Feature";
  properties: EarthquakeProperties;
  geometry: EarthquakeGeometry;
  id: string;
}

export interface EarthquakeCollection {
  type: "FeatureCollection";
  metadata: {
    generated: number;
    url: string;
    title: string;
    status: number;
    api: string;
    count: number;
  };
  features: EarthquakeFeature[];
}

// Processed earthquake data for our app
export interface ProcessedEarthquake {
  id: string;
  magnitude: number;
  place: string;
  time: Date;
  coordinates: {
    lat: number;
    lng: number;
    depth: number;
  };
  url: string;
  significance: number;
}

// Time window options
export type TimeWindow = "hour" | "day" | "week" | "month";

export const TIME_WINDOWS: Record<
  TimeWindow,
  { label: string; endpoint: string }
> = {
  hour: {
    label: "Past Hour",
    endpoint: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
  },
  day: {
    label: "Past Day",
    endpoint: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
  },
  week: {
    label: "Past Week",
    endpoint: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
  },
  month: {
    label: "Past Month",
    endpoint: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
  },
};

// New interface for cache entry
export interface CachedEarthquakeData {
  data: ProcessedEarthquake[];
  timestamp: number;
}