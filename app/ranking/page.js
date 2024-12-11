'use client';

import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useGame } from '../_contexts/game-context';
import Layout from '../game/layout';
import { db } from '../_utils/firebase';

export default function Ranking() {
  const { score: finalScore } = useGame();

  const [ranking, setRanking] = useState(null);

  const getRanking = async () => {
    const result = [];
    const querySnapshot = await getDocs(collection(db, 'scores'));
    querySnapshot.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
    console.log(result);
    result.sort(({ score: a }, { score: b }) => b - a);
    setRanking(result);
  };

  useEffect(() => {
    getRanking();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          You scored
          {' '}
          <span className="text-primary">{finalScore}</span>
          {' '}
          points!
        </h2>
        <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-bold px-4 py-2 border-b text-black text-center border-gray-200 border-b-4 border-black">Ranking</h2>
          <ul className="list-none p-4">
            {ranking && ranking.map(({
              id, photoURL, displayName, score,
            }) => (
              <li key={`score-${id}`} className="flex items-center py-2 border-b-2 border-black">
                <Image src={photoURL} alt={displayName} className="rounded-full mr-4" width={40} height={40} />
                <span className="text-base font-medium text-black">{displayName}</span>
                <span className="ml-3 text-base font-medium text-black">{score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
