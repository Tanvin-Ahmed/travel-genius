import { CreateTripUserInput } from "./pages/create-trip";

export type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  token: string | undefined;
};

export type Hotel = {
  hotelName?: string;
  hotelAddress?: string;
  price?: string;
  hotelImageUrl?: string;
  geoCoordinates?: string;
  rating?: number;
  description?: string;
};

type Transport = {
  mode?: string;
  cost?: string;
  time?: string;
};

export type Place = {
  placeName?: string;
  placeDetails?: string;
  placeImageUrl?: string;
  geoCoordinates?: string;
  ticketPricing?: string;
  rating?: number;
  timeTravel?: string;
  transport?: Transport[];
};

type ItineraryDay = {
  morning?: Place;
  afternoon?: Place;
  evening?: Place;
};

type Itinerary = {
  [day: string]: ItineraryDay;
};

export type AIResponse = {
  hotels?: Hotel[];
  itinerary?: Itinerary;
};

export type Trip = {
  id: string;
  tripData: AIResponse;
  userSelection: CreateTripUserInput;
  email: string;
};
