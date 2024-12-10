'use client';

import { useGame } from '../../_contexts/game-context';

export default function AlternativeButton({ isCorrect, text }) {
  const {
    isTimerStopped,
    setIsTimerStopped,
    updateScore,
    setRemainingTime,
  } = useGame();

  const handleAlternativeClick = () => {
    setIsTimerStopped(true);
    setRemainingTime(0);
    if (isCorrect) {
      updateScore();
    }
  };

  const getButtonColors = () => {
    if (isTimerStopped) {
      if (isCorrect) {
        return 'bg-blue-500 text-white';
      }

      return 'bg-red-500 text-white';
    }

    return 'bg-gray-300 text-black';
  };

  return (
    <button
      className={`p-4 w-full text-left rounded-lg ${getButtonColors()}`}
      type="button"
      onClick={handleAlternativeClick}
      disabled={isTimerStopped}
    >
      {text}
    </button>
  );
}
