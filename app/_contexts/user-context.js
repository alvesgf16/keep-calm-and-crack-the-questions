'use client';

import { useContext, createContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../_utils/firebase';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const googleSignIn = async () => {
    if (isSigningIn) {
      return;
    }
    
    const provider = new GoogleAuthProvider();
    setIsSigningIn(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Error signing in with Google: ' + error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const firebaseSignOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const handleAuth = (response) => {
        const { response_code, token } = response;

        if (!response_code) {
          const { displayName, email, photoUrl } = currentUser;
          setUser({ displayName, email, photoUrl, assertions: 0, score: 0 });
          localStorage.setItem('token', token);
        }
      };

      if (currentUser) {
        fetch('https://opentdb.com/api_token.php?command=request')
          .then((response) => response.json())
          .then(handleAuth);
      }
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, googleSignIn, firebaseSignOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserContext);
};
