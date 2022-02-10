import { describe, expect, it } from "vitest";
import App from "./App";
import { useStore } from "./store";
import { render, screen, userEvent } from "./test/test-utils";

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
