'use client';

import { useGame } from '../_contexts/game-context';
import Question from './components/question';
import Timer from './components/timer';

export default function Game() {
  const { questions, currentQuestionIndex, isTimerStopped, handleNextButtonClick } = useGame();
  const { category, question, incorrect_answers, correct_answer } =
    questions[currentQuestionIndex];

  return (
    <div className="flex items-center space-x-4">
      {questions.length > 0 && 
      (<Question
        category={category}
        question={question}
        incorrectAnswers={incorrect_answers}
        correctAnswer={correct_answer}
      />)}
      <Timer />
      {isTimerStopped && (
        <button className='text-black' type="button" onClick={handleNextButtonClick}>
          Next
        </button>
      )}
    </div>
  );
}
