'use client';

import { useGame } from '@/app/_contexts/game-context';
import React, { useRef, useEffect } from 'react';

export default function Timer() {
  const Ref = useRef(null);

  const { remainingTime, setRemainingTime, setIsTimerStopped } = useGame();

  useEffect(() => {
    const startTimer = () => {
      const id = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            setIsTimerStopped(true);
          }
          return prevTime === 0 ? 0 : prevTime - 1;
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
    <div className="text-center m-auto">
      <h2 className='text-black'>Remaining time: {remainingTime}</h2>
    </div>
  );
}
