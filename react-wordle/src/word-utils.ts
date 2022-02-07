import wordBank from './word-bank.json';

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomIndex];
}

export enum LetterState {
    Miss = 'Miss',
    Present = 'Present',
    Match = 'Match',
}

export function computeGuess(guess: string, answer: string): LetterState[] {
    const result: LetterState[] = [];
    const lettersFound: string[] = [];
    
    const guessArray = guess.split('');
    const answerArray = answer.split('');

    if (guessArray.length !== answerArray.length) {
        return result
    }

    guessArray.forEach((letter, index) => {
        if (letter === answerArray[index]) {
            result.push(LetterState.Match);
        } else if (answerArray.includes(letter) && !lettersFound.includes(letter)) {
            result.push(LetterState.Present);
            lettersFound.push(letter);
        } else {
            result.push(LetterState.Miss);
        }
    })

    return result;
}