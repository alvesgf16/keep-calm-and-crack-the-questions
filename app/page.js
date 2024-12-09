'use client';

import { useUserAuth } from './_contexts/user-context';
import Login from './login/page';

export default function Home() {
  const { user, firebaseSignOut } = useUserAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {user ? (
        <button
          onClick={async () => await firebaseSignOut()}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      ) : (
        <Login />
      )}
    </div>
  );
}
