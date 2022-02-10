import { LetterState, LETTER_LENGTH } from "./word-utils";

interface WordRowProps {
  letters: string;
  result?: LetterState[];
}

export default function WordRow({
  letters: lettersProp = "",
  result: resultProp = [],
}: WordRowProps) {
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char, index) => (
        <CharacterBox key={index} value={char} state={resultProp[index]} />
      ))}
    </div>
  );
}

interface CharacterBoxProps {
  value: string;
  state?: LetterState;
}

function CharacterBox({ value, state }: CharacterBoxProps) {
  const stateStyle = state == null ? "" : characterStateStyles[state];
  return (
    <span
      className={`inline-block border border-gray-500 
        before:inline-block before:content-['_']
        p-4 uppercase font-bold text-center ${stateStyle}`}
    >
      {value}
    </span>
  );
}

const characterStateStyles = {
  [LetterState.Miss]: "bg-gray-500 border-gray-500",
  [LetterState.Present]: "bg-yellow-500 border-yellow-500",
  [LetterState.Match]: "bg-green-500 border-green-500",
};
