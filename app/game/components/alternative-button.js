'use client';

import { useGame } from '@/app/_contexts/game-context';

export default function AlternativeButton({ isCorrect, text }) {
  const { isTimerStopped, setIsTimerStopped } = useGame();

  const handleAlternativeClick = () => {
    setIsTimerStopped(true);
    if (isCorrect) {
      updateScore();
    }
  };

  return (
    <button
      style={{
        border:
          isTimerStopped &&
          (isCorrect
            ? '3px solid rgb(6, 240, 15)'
            : '3px solid rgb(255, 0, 0)'),
      }}
      type="button"
      onClick={handleAlternativeClick}
      disabled={isTimerStopped}
      className="text-black"
    >
      {text}
    </button>
  );
}
