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

  return {
    uid: result.user.uid,
    displayName: result.user.displayName,
    email: result.user.email,
    photoURL: result.user.photoURL,
    token,
  };
};

export const googleSignOut = async () => {
  await signOut(auth);
};
