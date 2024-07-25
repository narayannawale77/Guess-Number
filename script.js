let randomNumber = parseInt(Math.random() * 100 + 1);

const userInput = document.querySelector('#guessInput');
const submit = document.querySelector('#submitGuess');
const resultMessage = document.querySelector('#resultMessage');
const resetGameButton = document.querySelector('#resetGame');
const previousGuesses = document.querySelector('#previousGuesses');
const remainingAttempts = document.querySelector('#remainingAttempts');

let playGame = true;
let prevGuesses = [];
let numberOfGuess = 0;
const maxGuesses = 10;

submit.addEventListener('click', function (e) {
    e.preventDefault();
    if (playGame) {
        const guess = parseInt(userInput.value);
        validateGame(guess);
    }
});

resetGameButton.addEventListener('click', function () {
    resetGame();
});

function validateGame(guess) {
    if (isNaN(guess)) {
        displayMessage('Please enter a valid number.');
    } else if (guess < 1) {
        displayMessage('Please enter a number greater than 0.');
    } else if (guess > 100) {
        displayMessage('Please enter a number less than 101.');
    } else {
        if (numberOfGuess === maxGuesses - 1) {
            displayGuess(guess);
            displayMessage(`Game over. You lose! The correct number was ${randomNumber}.`);
            endGame();
        } else {
            checkGuess(guess);
            displayGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage('You won the game!');
        endGame();
    } else if (guess < randomNumber) {
        displayMessage('Too low!');
    } else {
        displayMessage('Too high!');
    }
}

function displayGuess(guess) {
    userInput.value = '';
    prevGuesses.push(guess);
    previousGuesses.innerHTML = `Previous guesses: ${prevGuesses.join(', ')}`;
    numberOfGuess++;
    remainingAttempts.innerHTML = `Remaining attempts: ${maxGuesses - numberOfGuess}`;
}

function displayMessage(message) {
    resultMessage.innerHTML = message;
}

function endGame() {
    playGame = false;
    userInput.disabled = true;
}

function resetGame() {
    playGame = true;
    numberOfGuess = 0;
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuesses = [];
    userInput.value = '';
    userInput.disabled = false;
    resultMessage.innerHTML = '';
    previousGuesses.innerHTML = 'Previous guesses: ';
    remainingAttempts.innerHTML = `Remaining attempts: ${maxGuesses - numberOfGuess}`;
}
