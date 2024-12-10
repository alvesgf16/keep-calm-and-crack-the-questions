'use client';

import {
  useContext, createContext, useState, useEffect, useMemo,
  useCallback,
} from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';
import auth from '../_utils/firebase';

const GameContext = createContext();

export function GameContextProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(30);
  const [isTimerStopped, setIsTimerStopped] = useState(false);

  const difficultyPoints = useMemo(() => ({ easy: 1, medium: 2, hard: 3 }), []);

  const getQuestions = async () => {
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=10&token=${token}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.response_code === 0) {
        setQuestions(data.results);
      } else {
        console.error('Failed to fetch questions');
      }
    } catch (e) {
      console.error('Error fetching questions:', e);
    }
  };

  const updateScore = useCallback(() => {
    const BASE_POINTS = 10;
    const difficulty = difficultyPoints[questions[currentQuestionIndex]?.difficulty] || 1;
    const points = BASE_POINTS + remainingTime * difficulty;
    setScore((prevScore) => prevScore + points);
  }, [currentQuestionIndex, difficultyPoints, questions, remainingTime]);

  const handleNextButtonClick = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex));
    setRemainingTime(30);
    setIsTimerStopped(false);
  };

  useEffect(() => {
    getQuestions();
    setCurrentQuestionIndex(0);
  }, []);

  const value = useMemo(
    () => ({
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
    [questions, currentQuestionIndex, score, remainingTime, isTimerStopped, updateScore]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGame = () => useContext(GameContext);