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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        {questions.length > 0 && (
          <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
            <Question currentQuestion={questions[currentQuestionIndex]} />
          </div>
        )}
        <Timer />
        {isTimerStopped && (
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            type="button"
            onClick={handleNextButtonClick}
          >
            Next
          </button>
        )}
      </div>
    </Layout>
  );
}