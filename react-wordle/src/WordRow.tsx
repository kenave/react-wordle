import { LetterState, LETTER_LENGTH } from "./word-utils";

interface WordRowProps {
  letters: string;
  result?: LetterState[];
  guessNumber?: number;
  className?: string;
}

export default function WordRow({
  letters: lettersProp = "",
  result: resultProp = [],
  guessNumber: guessNumberProp,
  className: classNameProp = "",
}: WordRowProps) {
  const guessNumber = guessNumberProp;
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split("")
    .concat(Array(lettersRemaining).fill(""));
  const className = classNameProp;

  return (
    <div
      className={`grid grid-cols-5 gap-2 ${className}`}
      role={guessNumber ? "row" + guessNumber : "answer"}
    >
      {letters.map((char, index) => (
        <CharacterBox
          key={index}
          value={char}
          state={resultProp[index]}
          position={index + 1}
          size={guessNumber ? 4 : 2}
        />
      ))}
    </div>
  );
}

interface CharacterBoxProps {
  value: string;
  state?: LetterState;
  position: number;
  size: number;
}

function CharacterBox({ value, state, position, size }: CharacterBoxProps) {
  const stateStyle = state == null ? "" : characterStateStyles[state];
  return (
    <span
      className={`inline-block border border-gray-500 
        before:inline-block before:content-['_']
        p-${size} uppercase font-bold text-center text-2xl ${stateStyle}`}
      role={"letter" + position}
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
