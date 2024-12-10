'use client';

import { useUserAuth } from '../../_contexts/user-context';
import { useGame } from '../../_contexts/game-context';

export default function Header() {
  const { user, firebaseSignOut } = useUserAuth();
  const { score } = useGame();

  return (
    <header className="w-full bg-blue-500 text-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Trivia Game</h1>
        <p>Score: {score}</p>
      </div>
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <img src={user.photoUrl} alt={user.displayName} className="w-10 h-10 rounded-full" />
            <span>{user.displayName}</span>
            <button
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