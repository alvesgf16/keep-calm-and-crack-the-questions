'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useGame } from '../_contexts/game-context';
import Question from './components/question';
import Timer from './components/timer';

export default function Game() {
  const {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setRemainingTime,
    isTimerStopped,
    setIsTimerStopped,
    handleNextButtonClick,
  } = useGame();

  useEffect(() => {
    if (isTimerStopped) {
      const timer = setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(
            (prevIndex) => (prevIndex + 1),
          );
          setRemainingTime(30);
          setIsTimerStopped(false);
        } else {
          redirect('/ranking');
        }
      }, 5000); // Stay for 5 seconds before moving to the next question
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [
    currentQuestionIndex,
    isTimerStopped,
    questions.length,
    setCurrentQuestionIndex,
    setIsTimerStopped,
    setRemainingTime,
  ]);

  return (
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
  );
}
