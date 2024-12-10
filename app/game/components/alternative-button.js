'use client';

import { useGame } from '../../_contexts/game-context';
import { useEffect } from 'react';

export default function AlternativeButton({ isCorrect, text, index }) {
  const { isTimerStopped, setIsTimerStopped, updateScore, handleNextButtonClick, remainingTime, setRemainingTime } = useGame();

  const handleAlternativeClick = () => {
    setIsTimerStopped(true);
    setRemainingTime(0);
    if (isCorrect) {
      updateScore();
    }
  };

  useEffect(() => {
    if (isTimerStopped && remainingTime === 0) {
      const timer = setTimeout(() => {
        handleNextButtonClick();
        setRemainingTime(30);
        setIsTimerStopped(false);
      }, 5000); // Stay for 5 seconds before moving to the next question
      return () => clearTimeout(timer);
    }
  }, [isTimerStopped, remainingTime, handleNextButtonClick, setRemainingTime, setIsTimerStopped]);

  return (
    <button
      className={`p-4 w-full text-left rounded-lg ${
        isTimerStopped
          ? isCorrect
            ? 'bg-blue-500 text-white'
            : 'bg-red-500 text-white'
          : 'bg-gray-300 text-black'
      }`}
      type="button"
      onClick={handleAlternativeClick}
      disabled={isTimerStopped}
    >
      {text}
    </button>
  );
}