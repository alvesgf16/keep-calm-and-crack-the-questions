import AlternativeButton from './alternative-button';

export default function Question({ currentQuestion }) {
  if (!currentQuestion) return null;

  const { question, incorrect_answers, correct_answer } = currentQuestion;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{question}</h2>
      <div className="grid grid-cols-1 gap-4">
        {incorrect_answers.map((answer, index) => (
          <AlternativeButton
            key={`alternative-incorrect-${index}`}
            text={answer}
            isCorrect={false}
            index={index}
          />
        ))}
        <AlternativeButton
          key={`alternative-correct`}
          text={correct_answer}
          isCorrect={true}
          index={incorrect_answers.length}
        />
      </div>
    </div>
  );
}