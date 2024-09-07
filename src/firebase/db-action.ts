import { doc, setDoc } from "firebase/firestore";
import { AIResponse } from "../types";
import { db } from "./config";
import { CreateTripUserInput } from "../pages/create-trip";

export const saveTrip = async (
  tripInfo: AIResponse,
  userEmail: string,
  userSelection: CreateTripUserInput
) => {
  const docId = Date.now().toString();
  await setDoc(doc(db, "AiTrips", docId), {
    id: docId,
    email: userEmail,
    userSelection,
    tripData: tripInfo,
  });
};
