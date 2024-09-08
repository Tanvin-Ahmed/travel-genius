import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
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

export const getAllTrips = async (email: string) => {
  const data: Trip[] = [];
  const q = query(collection(db, "AiTrips"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((snapShot) => data.push(snapShot.data() as Trip));

  return data;
};
