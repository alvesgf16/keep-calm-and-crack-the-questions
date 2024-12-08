'use client';

import { useUserAuth } from '../_contexts/user-context';

// Import the useUserAuth hook

export default function Login() {
  // Use the useUserAuth hook to get the user object and the login and logout functions
  const { googleSignIn } = useUserAuth();

  return (
    <button
      onClick={async () => await googleSignIn()}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
    >
      Play with Google
    </button>
  );
}