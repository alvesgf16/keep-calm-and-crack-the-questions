'use client';

import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';

const GameContext = createContext();

export function GameContextProvider({ children }) {
  const [questions, setQuestions] = useState([
    {
      category: '',
      question: '',
      incorrect_answers: [''],
      correct_answer: '',
      difficulty: 'easy',
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(30);
  const [isTimerStopped, setIsTimerStopped] = useState(false);

  const difficultyPoints = useMemo(() => ({ easy: 1, medium: 2, hard: 3 }), []);

  const getQuestions = () => {
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=10&token=${token}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then(({ response_code: responseCode, results }) => {
          if (responseCode === 0) {
            setQuestions(results);
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  const updateScore = useCallback(() => {
    const BASE_POINTS = 10;
    const difficulty = difficultyPoints[questions[currentQuestionIndex].difficulty];
    const points = BASE_POINTS + remainingTime * difficulty;
    setScore((prevScore) => prevScore + points);
  }, [currentQuestionIndex, difficultyPoints, questions, remainingTime]);

  const handleNextButtonClick = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex < 10 ? prevIndex + 1 : prevIndex));
    setRemainingTime(30);
    setIsTimerStopped(false);
  };

  useEffect(() => {
    getQuestions();
    setCurrentQuestionIndex(0);
  }, []);

  const value = useMemo(
    () => (
      {
        questions,
        currentQuestionIndex,
        score,
        remainingTime,
        setRemainingTime,
        isTimerStopped,
        setIsTimerStopped,
        updateScore,
        handleNextButtonClick,
      }),
    [currentQuestionIndex, isTimerStopped, questions, remainingTime, score, updateScore],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGame = () => useContext(GameContext);
