'use client';

import Image from 'next/image';
import { useUserAuth } from '../_contexts/user-context';
import googleLogo from '../../public/google.png';

// Import the useUserAuth hook

export default function Login() {
  const { googleSignIn, isSigningIn } = useUserAuth();

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
    >
      <div className="bg-white p-12 rounded-lg shadow-lg text-center bg-opacity-80 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Keep Calm and Crack the Questions</h1>
        <button
          onClick={googleSignIn}
          className="p-3 bg-blue-400 text-white rounded hover:bg-blue-600 mb-4 flex items-center justify-center w-full"
          disabled={isSigningIn}
        >
          <Image
            src={googleLogo}
            alt="Google Logo"
            width={24}
            height={24}
            className="mr-2"
          />
          {isSigningIn ? 'Signing in...' : 'Play with Google'}
        </button>
      </div>
    </div>
  );
}
