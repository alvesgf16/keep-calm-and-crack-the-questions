import AlternativeButton from './alternative-button';

export default function Question({ currentQuestion }) {
  if (!currentQuestion) {
    return null;
  }

  const {
    question,
    alternatives,
  } = currentQuestion;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{question}</h2>
      <div className="grid grid-cols-1 gap-4">
        {alternatives.map(({ text, isCorrect }) => (
          <AlternativeButton
            key={`alternative-${text.replace(' ', '-')}`}
            text={text}
            isCorrect={isCorrect}
          />
        ))}
      </div>
    </div>
  );
}
