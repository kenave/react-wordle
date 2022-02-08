import { useStore } from "./store";
import { computeGuess, LetterState, LETTER_LENGTH } from "./word-utils";

interface WordRowProps {
  letters: string;
}

export default function WordRow({ letters: lettersProp = "" }: WordRowProps) {
  const answer = useStore((state) => state.answer);
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  const guessStates = computeGuess(lettersProp, answer);
  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char, index) => (
        <CharacterBox key={index} value={char} state={guessStates[index]} />
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
    <div
      className={`inline-block border border-gray-500 
    p-4 uppercase font-bold text-center ${stateStyle}`}
    >
      {value}
    </div>
  );
}

const characterStateStyles = {
  [LetterState.Miss]: "bg-gray-500 border-gray-500",
  [LetterState.Present]: "bg-yellow-500 border-yellow-500",
  [LetterState.Match]: "bg-green-500 border-green-500",
};
