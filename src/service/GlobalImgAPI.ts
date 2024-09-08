import axios from "axios";
import { GoogleImgResponse } from "../types";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

export const BASE_PHOTO_URL = `https://places.googleapis.com/v1/{name}/media?key=${
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY
}&maxHeightPx={height}&maxWidthPx={width}`;

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};

type Data = {
  textQuery: string;
};

export const getPlacePhotos = (data: Data) =>
  axios.post<GoogleImgResponse>(BASE_URL, data, config);
