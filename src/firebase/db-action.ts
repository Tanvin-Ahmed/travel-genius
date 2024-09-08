import { doc, setDoc, getDoc } from "firebase/firestore";
import { AIResponse, Trip } from "../types";
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

  return docId;
};

export const getSingleTrip = async (id: string) => {
  const ref = doc(db, "AiTrips", id);
  const docSnap = await getDoc(ref);

  const data = docSnap.data();

  if (data) {
    return data as Trip;
  } else {
    return null;
  }
};
