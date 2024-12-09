'use client';

import { useGame } from '../_contexts/game-context';
import Question from './components/question';
import Timer from './components/timer';
import Layout from './layout';

export default function Game() {
  const {
    questions,
    currentQuestionIndex,
    isTimerStopped,
    handleNextButtonClick,
  } = useGame();

  return (
    <Layout>
      <Question currentQuestion={questions[currentQuestionIndex]} />
      <Timer />
      {isTimerStopped && (
        <button
          className="text-black"
          type="button"
          onClick={handleNextButtonClick}
        >
          Next
        </button>
      )}
    </Layout>
  );
}
