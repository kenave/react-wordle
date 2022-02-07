const LETTER_LENGTH = 5;

interface WordRowProps {
  letters: string;
}

export default function WordRow({ letters: lettersProp = "" }: WordRowProps) {
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split("")
    .concat(Array(lettersRemaining).fill(""));
  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char, index) => (
        <CharacterBox key={index} value={char} />
      ))}
    </div>
  );
}

interface CharacterBoxProps {
  value: string;
}

function CharacterBox({ value }: CharacterBoxProps) {
  return (
    <div className="inline-block border border-gray-500 p-4 uppercase font-bold text-center">
      {value}
    </div>
  );
}
