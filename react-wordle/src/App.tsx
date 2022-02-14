import React, { useEffect, useRef, useState } from "react";
import Keyboard from "./Keyboard";
import { GUESS_LENGTH, useStore } from "./store";
import { isValidWord, LETTER_LENGTH } from "./word-utils";
import WordRow from "./WordRow";

export default function App() {
  const state = useStore();
  const [guess, setGuess, addGuessLetter] = useGuess("");
  const [showInvalidGuess, setInvalidGuess] = useState(false);
  const isGameOver = state.gameState !== "playing";
  const addGuess = useStore().addGuess;
  const previousGuess = usePrevious(guess);

  useEffect(() => {
    let id: number;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 1500);
    }

    return () => clearTimeout(id);
  }, [showInvalidGuess]);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
      if (isValidWord(previousGuess)) {
        addGuess(previousGuess);
        setInvalidGuess(false);
        return;
      }
      setInvalidGuess(true);
      setGuess(previousGuess);
    }
  }, [guess]);

  let rows = [...state.rows];

  let currentRow = 0;
  if (rows.length < GUESS_LENGTH) {
    currentRow = rows.push({ guess }) - 1;
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length;

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(""));
  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center">Reacdle</h1>
        {/* <WordRow letters={state.answer} /> */}
      </header>

      <main className="grid grid-rows-6 gap-4 mb-4">
        {rows.map(({ guess, result }, index) => (
          <WordRow
            key={index}
            letters={guess}
            result={result}
            guessNumber={index + 1}
            className={
              showInvalidGuess && currentRow === index ? "animate-shake" : ""
            }
          />
        ))}
      </main>

      <Keyboard
        onClick={(letter) => {
          addGuessLetter(letter);
        }}
      />

      {isGameOver && (
        <div
          role="modal"
          className="absolute bg-white rounded border border-gray-500
          text-center
          left-0 right-0 top-1/4 p-6 w-3/4 mx-auto"
        >
          Game Over!
          <WordRow letters={state.answer} />
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

function useGuess(
  init: string
): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (letter: string) => void
] {
  const [guess, setGuess] = useState(init);

  const addGuessLetter = (letter: string) => {
    if ((letter >= "a" && letter <= "z") || (letter >= "A" && letter <= "Z")) {
      setGuess((curGuess) => {
        const newGuess = letter.length === 1 ? curGuess + letter : curGuess;

        if (curGuess.length === LETTER_LENGTH) {
          return curGuess;
        }
        return newGuess;
      });
    }
    switch (letter) {
      case "Backspace":
        setGuess((curGuess) => {
          return curGuess.slice(0, -1);
        });
        break;
      case "Enter":
        setGuess((curGuess) => {
          if (curGuess.length === LETTER_LENGTH) {
            return "";
          }
          return curGuess;
        });
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const letter = e.key;
    addGuessLetter(letter);
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return [guess, setGuess, addGuessLetter];
}

// source https://usehooks.com/usePrevious/
function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
