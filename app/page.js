'use client';

import { useUserAuth } from './_contexts/user-context';
import Game from './game/page';
import Login from './login/page';

export default function Home() {
  const { user } = useUserAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {user ? <Game /> : <Login />}
    </div>
  );
}
