// src/services/earthquakeService.ts

import type {
  EarthquakeCollection,
  EarthquakeFeature,
  ProcessedEarthquake,
  TimeWindow,
  CachedEarthquakeData,
} from "../types/earthquake";

import { TIME_WINDOWS } from "../types/earthquake";

// Cache lifetime in milliseconds (e.g., 5 minutes)
const CACHE_LIFETIME = 5 * 60 * 1000;

export class EarthquakeService {
  private static abortController: AbortController | null = null;
  // Simple in-memory cache
  private static cache = new Map<TimeWindow, CachedEarthquakeData>();

  static async fetchEarthquakes(
    timeWindow: TimeWindow = "day"
  ): Promise<ProcessedEarthquake[]> {
    // Check for cached data
    const cachedEntry = this.cache.get(timeWindow);
    if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_LIFETIME) {
      console.log(`Using cached data for ${timeWindow}`);
      return cachedEntry.data;
    }

    // Cancel any existing request
    if (this.abortController) {
      this.abortController.abort();
    }

    // Create new abort controller for this request
    this.abortController = new AbortController();

    try {
      const endpoint = TIME_WINDOWS[timeWindow].endpoint;
      console.log(`Fetching new data from: ${endpoint}`);

      const response = await fetch(endpoint, {
        signal: this.abortController.signal,
        headers: {
          Accept: "application/json",
        },
      });

      // Check for HTTP errors (e.g., 404, 500)
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("API endpoint not found. Please try a different time window.");
        } else if (response.status === 500) {
          throw new Error("Server error. The API might be temporarily unavailable. Please try again later.");
        } else {
          throw new Error(`Failed to fetch data with status: ${response.status}`);
        }
      }

      const data: EarthquakeCollection = await response.json();
      const processedData = this.processEarthquakeData(data.features);

      // Store the new data in the cache
      this.cache.set(timeWindow, {
        data: processedData,
        timestamp: Date.now(),
      });

      return processedData;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Fetch aborted");
        // Returning an empty array for aborted requests prevents race conditions from showing stale data.
        return [];
      }
      const friendlyError = "Failed to load recent earthquake data. Please check your internet connection and try again.";
      console.error("Failed to fetch earthquake data:", error);
      throw new Error(friendlyError);
    } finally {
      this.abortController = null;
    }
  }

  private static processEarthquakeData(
    features: EarthquakeFeature[]
  ): ProcessedEarthquake[] {
    return features
      .filter((feature) => {
        // Filter out invalid data
        const { mag } = feature.properties;
        const [lng, lat] = feature.geometry.coordinates;

        return (
          mag !== null &&
          !isNaN(lat) &&
          !isNaN(lng) &&
          lat >= -90 &&
          lat <= 90 &&
          lng >= -180 &&
          lng <= 180
        );
      })
      .map((feature) => {
        const { properties, geometry, id } = feature;
        const [lng, lat, depth] = geometry.coordinates;

        return {
          id: id.toString(),
          magnitude: properties.mag!,
          place: properties.place || "Unknown location",
          time: new Date(properties.time),
          coordinates: {
            lat,
            lng,
            depth: depth || 0,
          },
          url: properties.url || "",
          significance: properties.sig || 0,
        };
      })
      .sort((a, b) => b.magnitude - a.magnitude); // Sort by magnitude (highest first)
  }

  static cancelCurrentRequest(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  // New method to clear the cache
  static clearCache(): void {
    this.cache.clear();
    console.log('Cache cleared manually.');
  }
}