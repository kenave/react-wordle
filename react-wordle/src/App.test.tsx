import { describe, expect, it } from "vitest";
import App from "./App";
import { useStore } from "./store";
import { render, screen, userEvent, within } from "./test/test-utils";

describe("Simple working test", () => {
  it("the title is visible", () => {
    render(<App />);
    expect(screen.getByText(/Reacdle/i)).toBeInTheDocument();
  });

  it("shows empty state", () => {
    useStore.getState().newGame([]);
    render(<App />);

    expect(screen.queryByText("Game Over!")).toBeNull(); // not showing Game Over modal
    expect(document.querySelectorAll("main div")).toHaveLength(6); // 6 rows
    expect(document.querySelector("main")?.textContent).toEqual(""); // with empty characters
  });

  it("shows one row of guesses", () => {
    useStore.getState().newGame(["qualm"]);
    render(<App />);

    expect(screen.queryByText("Game Over!")).toBeNull(); // not showing Game Over modal
    expect(document.querySelectorAll("main div")).toHaveLength(6); // 6 rows
    expect(document.querySelector("main")?.textContent).toEqual("qualm"); // with empty characters
  });

  it("shows lost game over state", () => {
    useStore
      .getState()
      .newGame(["qualm", "ducks", "quack", "stuck", "prick", "humor"]);
    render(<App />);

    expect(screen.getByText(/Game Over/i)).toBeInTheDocument(); // showing Game Over modal
  });

  it("shows won game over state", () => {
    useStore.getState().newGame(["qualm", "ducks", "quack"]);
    const answer = useStore.getState().answer;
    useStore.getState().addGuess(answer);
    render(<App />);

    expect(screen.getByText(/Game Over/i)).toBeInTheDocument(); // showing Game Over modal
  });

  it("can start a new game", () => {
    useStore
      .getState()
      .newGame(["qualm", "ducks", "quack", "stuck", "prick", "humor"]);
    render(<App />);

    expect(screen.getByText(/Game Over/i)).toBeInTheDocument(); // showing Game Over modal
    userEvent.click(screen.getByText("New Game"));
    expect(screen.queryByText("Game Over!")).toBeNull(); // not showing Game Over modal
    expect(document.querySelectorAll("main div")).toHaveLength(6); // 6 rows
    expect(document.querySelector("main")?.textContent).toEqual(""); // with empty characters
  });
});

describe("Global keydown listener test", () => {
  it("can type a guess", () => {
    useStore.getState().newGame();
    render(<App />);

    userEvent.keyboard("apple");
    const row = screen.getByRole("row1");
    expect(within(row).getByRole("letter1")?.textContent).toEqual("a");
    expect(within(row).getByRole("letter2")?.textContent).toEqual("p");
    expect(within(row).getByRole("letter3")?.textContent).toEqual("p");
    expect(within(row).getByRole("letter4")?.textContent).toEqual("l");
    expect(within(row).getByRole("letter5")?.textContent).toEqual("e");
  });

  it("can delete the last character in the current guess", () => {
    useStore.getState().newGame();
    render(<App />);

    userEvent.keyboard("apple");
    const row = screen.getByRole("row1");
    expect(within(row).getByRole("letter5")?.textContent).toEqual("e");
    userEvent.keyboard("{Backspace}");
    expect(within(row).getByRole("letter5")?.textContent).toEqual("");
  });

  it("can input a guess and start typing in the next row", () => {
    // need to specify the answer in the off chance that apple is the word, don't want a game over state
    useStore.getState().newGame([], "tests");
    render(<App />);

    userEvent.keyboard("apple{Enter}g");
    const row = screen.getByRole("row2");
    expect(within(row).getByRole("letter1")?.textContent).toEqual("g");
  });

  it("ignores input (except backspace and enter) after the fifth letter in a guess", () => {
    useStore.getState().newGame();
    render(<App />);

    userEvent.keyboard("apple");
    userEvent.keyboard("b");
    const row = screen.getByRole("row1");
    expect(within(row).getByRole("letter5")?.textContent).toEqual("e");
  });

  it("ignores special characters (except backspace and enter)", () => {
    useStore.getState().newGame();
    render(<App />);

    userEvent.keyboard("~!@#$%^&*()_+,./;'[[]]{{}}|\\1234567890<>?:\"`");
    const row = screen.getByRole("row1");
    expect(within(row).getByRole("letter1")?.textContent).toEqual("");
  });
});

describe("game rules tests", () => {
  it("does not accept invalid words", () => {
    useStore.getState().newGame();
    render(<App />);

    userEvent.keyboard("lameo{Enter}");
    expect(useStore.getState().rows.length).toBe(0);
  });
});
