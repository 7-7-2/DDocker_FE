import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  browserSessionPersistence
} from 'firebase/auth';

const auth = getAuth(app);
import { app } from '@/firebase.config';
setPersistence(auth, browserSessionPersistence);

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  return await signInWithPopup(auth, googleProvider);
};

export const signOutAuth = async () => {
  const auth = getAuth(app);
  await signOut(auth);
};
