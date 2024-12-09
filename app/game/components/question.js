'use client';

import { useEffect, useState } from 'react';
import AlternativeButton from './alternative-button';

export default function Question({ currentQuestion }) {
  const {
    category,
    question,
    incorrect_answers: incorrectAnswers,
    correct_answer: correctAnswer,
  } = currentQuestion;

  const [alternatives, setAlternatives] = useState([{ text: '', isCorrect: false }]);

  useEffect(() => {
    const shuffleArray = (array) => {
      const result = [...array];

      let toShuffle = array.length;

      while (toShuffle !== 0) {
        const toSwap = Math.floor(Math.random() * toShuffle);
        toShuffle -= 1;

        [result[toShuffle], result[toSwap]] = [result[toSwap], result[toShuffle]];
      }

      return result;
    };

    const renderAlternatives = () => {
      let result = incorrectAnswers.map((text) => (
        { text, isCorrect: false }
      ));
      result = [...result,
        { text: correctAnswer, isCorrect: true },
      ];
      console.log('before', result);
      result = shuffleArray(result);
      console.log('after', result);
      return result;
    };

    setAlternatives(renderAlternatives());
  }, [correctAnswer, incorrectAnswers]);

  return (
    <div>
      <h3 className="text-black">{category}</h3>
      <p className="text-black">{question}</p>
      <section>
        {alternatives.map(({ text, isCorrect }) => (
          <AlternativeButton
            key={`alternative-${text.replace(' ', '-')}`}
            isCorrect={isCorrect}
            text={text}
          />
        ))}
      </section>
    </div>
  );
}
