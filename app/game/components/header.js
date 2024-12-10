'use client';

import Image from 'next/image';
import { useUserAuth } from '../../_contexts/user-context';
import { useGame } from '../../_contexts/game-context';

export default function Header() {
  const { user, firebaseSignOut } = useUserAuth();
  const { score } = useGame();

  return (
    <header className="w-full bg-blue-500 text-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Trivia Game</h1>
        <p>
          Score:
          {score}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <Image src={user.photoURL} alt={user.displayName} className="rounded-full" width={40} height={40} />
            <span>{user.displayName}</span>
            <button
              type="button"
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
              onClick={firebaseSignOut}
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </header>
  );
}
