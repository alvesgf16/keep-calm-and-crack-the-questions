'use client';

import {
  useContext, createContext, useState, useMemo, useCallback,
} from 'react';

const GameContext = createContext();

export function GameContextProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(30);
  const [isTimerStopped, setIsTimerStopped] = useState(false);

  const difficultyPoints = useMemo(() => ({ easy: 1, medium: 2, hard: 3 }), []);

  const shuffle = (anArray) => {
    const result = [...anArray];
    let currentIndex = result.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
    // Pick a remaining element...
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [result[currentIndex], result[randomIndex]] = [
        result[randomIndex], result[currentIndex]];
    }

    return result;
  };

  const formatResult = useCallback(({
    difficulty,
    question,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  }) => {
    const alternatives = shuffle([
      ...incorrectAnswers.map((text) => ({ text, isCorrect: false })),
      { text: correctAnswer, isCorrect: true },
    ]);

    return { difficulty, question, alternatives };
  }, []);

  const getQuestions = useCallback(async () => {
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=3&token=${token}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.response_code === 0) {
        setQuestions(data.results.map(formatResult));
      } else {
        console.error(`Failed to fetch questions. Response code was ${data.response_code}.`);
      }
    } catch (e) {
      console.error('Error fetching questions:', e);
    }
  }, [formatResult]);

  const updateScore = useCallback(() => {
    const BASE_POINTS = 10;
    const difficulty = difficultyPoints[questions[currentQuestionIndex]?.difficulty] || 1;
    const points = BASE_POINTS + remainingTime * difficulty;
    setScore((prevScore) => prevScore + points);
  }, [currentQuestionIndex, difficultyPoints, questions, remainingTime]);

  const value = useMemo(
    () => ({
      questions,
      currentQuestionIndex,
      setCurrentQuestionIndex,
      score,
      remainingTime,
      setRemainingTime,
      isTimerStopped,
      setIsTimerStopped,
      getQuestions,
      updateScore,
    }),
    [
      currentQuestionIndex,
      getQuestions,
      isTimerStopped,
      questions,
      remainingTime,
      score,
      updateScore,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGame = () => useContext(GameContext);
