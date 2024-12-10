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
    querySnapshot.forEach(({ id, data }) => result.push({ id, ...data() }));
    result.sort(({ score: a }, { score: b }) => b - a);
    setRanking(result);
  };

  useEffect(() => {
    getRanking();
  }, []);

  return (
    <Layout>
      <div>
        <h2>
          You scored
          {' '}
          <span>{finalScore}</span>
          {' '}
          points!
        </h2>
        <div>
          <h2>Ranking</h2>
          <ul>
            {ranking && ranking.map(({
              id, photoURL, displayName, score,
            }) => (
              <li key={`score-${id}`}>
                <Image src={photoURL} alt={displayName} className="rounded-full" width={40} height={40} />
                <span>{displayName}</span>
                <span>{score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>

  );
}

// TODO 14/p1 15/p3 17/p2
