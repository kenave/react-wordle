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

  const isGameOver = state.guesses.length === GUESS_LENGTH;

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(""));
  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center">Reacdle</h1>
        {/* <WordRow letters={state.answer} /> */}
        <input
          type="text"
          className="w-full p-2 border-2 border-gray-500"
          value={guess}
          onChange={onChange}
          disabled={isGameOver}
        ></input>
      </header>

      <main className="grid grid-rows-6 gap-4">
        {rows.map((word, index) => (
          <WordRow key={index} letters={word} />
        ))}
      </main>

      {isGameOver && (
        <div
          role="modal"
          className="absolute bg-white rounded border border-gray-500
          text-center
          left-0 right-0 top-1/4 p-6 w-3/4 mx-auto"
        >
          Game Over!
          <button
            className="block border rounded border-green-500 bg-green-500 p-2 mt-4 mx-auto shadow"
            onClick={() => {
              state.newGame();
              setGuess("");
            }}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
}
