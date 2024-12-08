"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import googleLogo from '/public/google.png';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';

function Loginpage() {
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleRegisterNavigation = () => {
    router.push('/register');
  };

  const handleGoogleSignIn = async () => {
    if (isSigningIn) return; // Prevent multiple pop-up requests
    const provider = new GoogleAuthProvider();
    setIsSigningIn(true);
    try {
      await signInWithPopup(auth, provider);
      alert('User signed in with Google successfully!');
      // You can redirect the user to another page if needed
      // router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Error signing in with Google: ' + error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/bg.jpg)' }}>
      <div className="bg-white p-12 rounded-lg shadow-lg text-center bg-opacity-80 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Trivia Game</h1>
        <form className="flex flex-col">
          <input type="text" id="username" name="username" placeholder="Username" required className="p-3 mb-4 border border-gray-300 rounded" />
          <input type="password" id="password" name="password" placeholder="Password" required className="p-3 mb-4 border border-gray-300 rounded" />
          <button type="submit" className="p-3 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4 text-lg w-full">Login</button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="p-3 bg-blue-400 text-white rounded hover:bg-blue-600 mb-4 flex items-center justify-center w-full"
          disabled={isSigningIn}
        >
          <Image src={googleLogo} alt="Google logo" width={24} height={24} className="mr-2" />
          {isSigningIn ? 'Signing in..' : 'Login with Google'}
        </button>
        <div className="text-sm text-gray-600">
          Not registered? <button onClick={handleRegisterNavigation} className="text-blue-500 hover:text-blue-700">Register</button>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;