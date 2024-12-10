'use client';

import { useGame } from '../_contexts/game-context';
import Layout from '../game/layout';

export default function Ranking() {
  const { score } = useGame();

  return (
    <Layout>
      <h2>{score}</h2>
      <div>
        <h2>Ranking</h2>
      </div>
    </Layout>
  );
}
