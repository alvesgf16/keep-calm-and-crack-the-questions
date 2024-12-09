import { useGame } from '@/app/_contexts/game-context';
import { useUserAuth } from '@/app/_contexts/user-context';
import Image from 'next/image';

export default function Header() {
  const { user, firebaseSignOut } = useUserAuth();
  const { score } = useGame();

  return (
    <header>
      <h1>
        <Image src={user.photoUrl} alt="User" />
        <p className="text-xl text-black font-medium">
          Welcome, {user.displayName}
        </p>
      </h1>
      <h4>{score}</h4>
      <button
        onClick={async () => await firebaseSignOut()}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
}
