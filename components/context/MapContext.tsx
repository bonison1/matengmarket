// context/MapContext.tsx
"use client";

import { createContext, useState, ReactNode } from "react";

// Define the type for a location (coordinates and name)
interface Location {
  coords: [number, number]; // [lng, lat]
  name: string;
}

// Define the type for a suggestion (based on Ola Maps Autocomplete API response)
interface Suggestion {
  place_id: string;
  description: string;
  geometry: {
    coordinates: [number, number];
  };
}

// Define the context shape
interface MapContextType {
  pickup: Location | null;
  dropoff: Location | null;
  pickupSuggestions: Suggestion[];
  dropoffSuggestions: Suggestion[];
  updatePickup: (coords: [number, number], name?: string) => void;
  updateDropoff: (coords: [number, number], name?: string) => void;
  updatePickupSuggestions: (suggestions: Suggestion[]) => void;
  updateDropoffSuggestions: (suggestions: Suggestion[]) => void;
}

// Create the context with a default value
export const MapContext = createContext<MapContextType>({
  pickup: null,
  dropoff: null,
  pickupSuggestions: [],
  dropoffSuggestions: [],
  updatePickup: () => {},
  updateDropoff: () => {},
  updatePickupSuggestions: () => {},
  updateDropoffSuggestions: () => {},
});

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider = ({ children }: MapProviderProps) => {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [dropoff, setDropoff] = useState<Location | null>(null);
  const [pickupSuggestions, setPickupSuggestions] = useState<Suggestion[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<Suggestion[]>([]);

  const updatePickup = (coords: [number, number], name = "Unknown Location") => {
    setPickup({ coords, name });
  };

  const updateDropoff = (coords: [number, number], name = "Unknown Location") => {
    setDropoff({ coords, name });
  };

  const updatePickupSuggestions = (suggestions: Suggestion[]) =>
    setPickupSuggestions(suggestions);
  const updateDropoffSuggestions = (suggestions: Suggestion[]) =>
    setDropoffSuggestions(suggestions);

  return (
    <MapContext.Provider
      value={{
        pickup,
        dropoff,
        pickupSuggestions,
        dropoffSuggestions,
        updatePickup,
        updateDropoff,
        updatePickupSuggestions,
        updateDropoffSuggestions,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};