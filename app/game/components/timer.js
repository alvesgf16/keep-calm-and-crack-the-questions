'use client';

import { useRef, useEffect } from 'react';
import { useGame } from '../../_contexts/game-context';

export default function Timer() {
  const Ref = useRef(null);

  const { remainingTime, setRemainingTime, setIsTimerStopped } = useGame();

  useEffect(() => {
    const startTimer = () => {
      const id = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(id);
            setIsTimerStopped(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      Ref.current = id;
    };

    startTimer();

    return () => {
      clearInterval(Ref.current);
    };
  }, [setIsTimerStopped, setRemainingTime]);

  return (
    <div className="text-center m-auto mt-4">
      <h2 className="text-xl font-bold">
        Remaining time: {remainingTime}
      </h2>
    </div>
  );
}