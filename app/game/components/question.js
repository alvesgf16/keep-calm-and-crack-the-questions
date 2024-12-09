import AlternativeButton from './alternative-button';

export default function Question({
  category,
  question,
  incorrectAnswers,
  correctAnswer,
}) {
  const renderAlternatives = () => {
    const result = incorrectAnswers.map((answer, index) => (
      <AlternativeButton key={`alternative-${index}`} text={answer} />
    ));
    result.push(
      <AlternativeButton
        key={`alternative-${result.length}`}
        isCorrect
        text={correctAnswer}
      />,
    );
    return shuffleArray(result);
  };

  const shuffleArray = (array) => {
    const result = [...array];

    for (let toShuffle = array.length; toShuffle > 0; toShuffle -= 1) {
      let toSwap = Math.floor(Math.random() * toShuffle);
      [array[toShuffle], array[toSwap]] = [array[toSwap], array[toShuffle]];
    }

    return result;
  };

  return (
    <div>
      <h3 className="text-black">{category}</h3>
      <p className="text-black">{question}</p>
      <section>{renderAlternatives()}</section>
    </div>
  );
}
