import React from "react";

export default function Keyboard({
  onClick: onClickProp,
}: {
  onClick: (letter: string) => void;
}) {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const letter = e.currentTarget.textContent;
    if (letter != "") {
      console.log(letter);
      onClickProp(letter!);
    }
  };
  return (
    <div className="flex flex-col">
      {keyboardKeys.map((keyboardRow, rowIndex) => {
        return (
          <div key={rowIndex} className="flex justify-center my-2 space-x-1">
            {keyboardRow.map((key, keyIndex) => {
              let styles = "rounded font-bold uppercase py-2 flex-1";
              if (key != "") {
                styles += " bg-gray-400";
              }
              return (
                <button key={keyIndex} className={styles} onClick={onClick}>
                  {key}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const keyboardKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];