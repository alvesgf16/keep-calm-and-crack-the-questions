'use client';

import {
  useContext, createContext, useState, useEffect, useMemo,
  useCallback,
} from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';
import { redirect } from 'next/navigation';
import auth from '../_utils/firebase';

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const googleSignIn = useCallback(async () => {
    if (isSigningIn) {
      return;
    }

    const provider = new GoogleAuthProvider();
    setIsSigningIn(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert(`Error signing in with Google: ${error.message}`);
    } finally {
      setIsSigningIn(false);
    }
  }, [isSigningIn]);

  const firebaseSignOut = async () => {
    await signOut(auth);
    redirect('/login');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const handleAuth = (response) => {
      const { response_code: responseCode, token } = response;

      if (responseCode === 0) {
        const { displayName, photoUrl } = user;
        setUser({ displayName, photoUrl });
        localStorage.setItem('token', token);
      }
    };

    if (user) {
      fetch('https://opentdb.com/api_token.php?command=request')
        .then((response) => response.json())
        .then(handleAuth);
    }

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ user, googleSignIn, firebaseSignOut }), [googleSignIn, user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserAuth = () => useContext(UserContext);
