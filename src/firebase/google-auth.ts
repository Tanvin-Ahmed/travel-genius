import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { app } from "./config";

const provider = new GoogleAuthProvider();

const auth = getAuth(app);
export const singInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);

  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;

  return { user: result.user, token };
};

export const googleSignOut = async () => {
  await signOut(auth);
};
