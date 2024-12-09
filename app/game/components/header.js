'use client';

import Image from 'next/image';
import { useGame } from '../../_contexts/game-context';
import { useUserAuth } from '../../_contexts/user-context';

export default function Header() {
  const { user, firebaseSignOut } = useUserAuth();
  const { score } = useGame();

  return (
    <header>
      <h1>
        {user.photoUrl && <Image src={user.photoUrl} alt="User" />}
        <p className="text-xl text-black font-medium">
          Welcome,
          {' '}
          {user.displayName}
        </p>
      </h1>
      <h4 className="text-black">{score}</h4>
      <button
        type="button"
        onClick={async () => firebaseSignOut()}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
}
