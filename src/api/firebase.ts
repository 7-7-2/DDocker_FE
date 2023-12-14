import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { app } from '@/firebase.config';

export const signInWithGoogle = async () => {
  const auth = getAuth(app);
  setPersistence(auth, browserSessionPersistence);
  const googleProvider = new GoogleAuthProvider();
  return await signInWithPopup(auth, googleProvider);
};

export const signOutAuth = async () => {
  const auth = getAuth(app);
  await signOut(auth);
};
