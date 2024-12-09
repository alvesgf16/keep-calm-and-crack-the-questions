'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(30);
  const [isTimerStopped, setIsTimerStopped] = useState(false);

  const difficultyPoints = { easy: 1, medium: 2, hard: 3 };

  const getQuestions = () => {
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=10&token=${token}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then(({ response_code, results }) => {
          if (response_code === 0) {
            setQuestions(results);
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  const updateScore = () => {
    const BASE_POINTS = 10;
    const difficulty = difficultyPoints[currentQuestion.difficulty];
    const points = BASE_POINTS + time * difficulty;
    setScore((prevScore) => prevScore + points);
  };

  const handleNextButtonClick = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < 10) {
        return (prevIndex += 1);
      }
    });
    setRemainingTime(30);
    setIsTimerStopped(false);
  };

  useEffect(() => {
    getQuestions();
    setCurrentQuestionIndex(0);
  }, []);

  const value = {
    questions,
    currentQuestionIndex,
    score,
    remainingTime,
    setRemainingTime,
    isTimerStopped,
    setIsTimerStopped,
    updateScore,
    handleNextButtonClick,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  return useContext(GameContext);
};
