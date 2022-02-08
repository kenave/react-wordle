import React, { useState } from "react";
import { useStore } from "./store";
import { LETTER_LENGTH } from "./word-utils";
import WordRow from "./WordRow";

const GUESS_LENGTH = 6;

export default function App() {
  const [guess, setGuess] = useState("");
  const state = useStore();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value;

    if (newGuess.length === LETTER_LENGTH) {
      state.addGuess(newGuess);
      setGuess("");
      return;
    }

    setGuess(newGuess);
  };

  let rows = [...state.guesses];

  if (rows.length < GUESS_LENGTH) {
    rows.push(guess);
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length;

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(""));
  return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center">Reacdle</h1>
        {/* <WordRow letters={state.answer} /> */}
        <input
          type="text"
          className="w-full p-2 border-2 border-gray-500"
          value={guess}
          onChange={onChange}
        ></input>
      </header>

      <main className="grid grid-rows-6 gap-4">
        {rows.map((word, index) => (
          <WordRow key={index} letters={word} />
        ))}
      </main>
    </div>
  );
}
