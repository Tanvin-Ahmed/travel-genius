type Hotel = {
  hotelName: string;
  hotelAddress: string;
  price: string;
  hotelImageUrl: string;
  geoCoordinates: string;
  rating: number;
  description: string;
};

type Transport = {
  mode: string;
  cost: string;
  time: string;
};

type Place = {
  placeName: string;
  placeDetails: string;
  placeImageUrl: string;
  geoCoordinates: string;
  ticketPricing: string;
  rating: number;
  timeTravel: string;
  transport: Transport[];
};

type ItineraryDay = {
  morning: Place;
  afternoon: Place;
  evening: Place;
};

type Itinerary = {
  [day: string]: ItineraryDay;
};

export type AIResponse = {
  hotels: Hotel[];
  itinerary: Itinerary;
};
