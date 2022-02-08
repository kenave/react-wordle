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
    const skipIndices: number[] = [];
    
    const guessArray = guess.split('');
    const answerArray = answer.split('');

    if (guessArray.length !== answerArray.length) {
        return result
    }

    answerArray.forEach((letter, index) => {
        if (letter === guessArray[index]) {
            result[index] = LetterState.Match;
            lettersFound.push(letter);
            skipIndices.push(index);
        }
    })

    guessArray.forEach((letter, index) => {
        if (!skipIndices.includes(index)) {
            if (answerArray.includes(letter) && !lettersFound.includes(letter)) {
                result[index] = LetterState.Present;
                lettersFound.push(letter);
            } else {
                result[index] = LetterState.Miss;
            }
        }
    })

    return result;
}