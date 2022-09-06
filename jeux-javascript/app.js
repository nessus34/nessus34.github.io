/* var */


let firstPlayerName = document.getElementById('first-player-name');
let secondPlayerName = document.getElementById('second-player-name');
let winnerName = document.getElementById('winner-name');


let playerBackground = document.getElementById('player-background');
let firstPlayerTurn = document.getElementById('first-player-turn');
let secondPlayerTurn = document.getElementById('second-player-turn');

let firstPlayerTotal = document.getElementById('first-player-total');
let firstPlayerCurrent = document.getElementById('first-player-current');
let secondPlayerTotal = document.getElementById('second-player-total');
let secondPlayerCurrent = document.getElementById('second-player-current');


const btnNewGame = document.getElementById('btn-new-game');
const btnRoll = document.getElementById('btn-roll');
const btnHold = document.getElementById('btn-hold');


let diceFace = document.getElementById('dice-face');
const dice6Faces = [
    `<div class="dice face-1"><span class="dot"></span></div>`,
    `<div class="dice face-2"><span class="dot"></span><span class="dot"></span></div>`,
    `<div class="dice face-3"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`,
    `<div class="dice face-4"><div class="dice-column"><span class="dot"></span><span class="dot"></span></div><div class="dice-column"><span class="dot"></span><span class="dot"></span></div></div>`,
    `<div class="dice face-5"><div class="dice-column"><span class="dot"></span><span class="dot"></span></div><div class="dice-column"><span class="dot"></span></div><div class="dice-column"><span class="dot"></span><span class="dot"></span></div></div>`,
    `<div class="dice face-6"><div class="dice-column"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div><div class="dice-column"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div></div>`,
];


let activePlayer;
let activePlayerCurrent = 0;
let activePlayerTotal = 0;

let isGamePlaying = false;
let player1 = {
    name: firstPlayerName,
    current: firstPlayerCurrent,
    total: firstPlayerTotal,
    isWinner: false
};
let player2 = {
    name: secondPlayerName,
    current: secondPlayerCurrent,
    total: secondPlayerTotal,
    isWinner: false
};;

/*function */


function newGame() {
    isGamePlaying = true;
    firstPlayerCurrent.textContent = 0;
    firstPlayerTotal.textContent = 0;
    secondPlayerCurrent.textContent = 0;
    secondPlayerTotal.textContent = 0;

    activePlayer = player1;

    playerBackground.classList.remove('turn-player-2');
    secondPlayerTurn.classList.remove('dot-current-player');
    secondPlayerName.classList.remove('font-current-player');

    playerBackground.classList.add('turn-player-1');
    firstPlayerTurn.classList.add('dot-current-player');
    firstPlayerName.classList.add('font-current-player');


}
btnNewGame.addEventListener('click', newGame);




function roll() {
    if (isGamePlaying) {
        let result = Math.floor((Math.random() * 6) + 1);
        diceFace.innerHTML = dice6Faces[result - 1];
        if (result !== 1) {
            activePlayerCurrent += result;
            activePlayer.current.textContent = activePlayerCurrent;
        } else {
            activePlayerCurrent = 0;
            activePlayer.current.textContent = activePlayerCurrent;
            nextRound();
        }
    }
}
btnRoll.addEventListener('click', roll);


function hold() {
    if (isGamePlaying) {
        activePlayerTotal = Number(activePlayer.total.textContent) + activePlayerCurrent;
        activePlayer.total.textContent = activePlayerTotal;
        activePlayerCurrent = 0;
        activePlayer.current.textContent = activePlayerCurrent;
        if (activePlayerTotal < 100) {
            nextRound();
        } else {
            activePlayer.isWinner = true;
            isGamePlaying = false;

        }
    }
}
btnHold.addEventListener('click', hold);


function nextRound() {
    if (activePlayer === player1) {
        activePlayer = player2;

        playerBackground.classList.remove('turn-player-1');
        firstPlayerTurn.classList.remove('dot-current-player');
        firstPlayerName.classList.remove('font-current-player');

        playerBackground.classList.add('turn-player-2');
        secondPlayerTurn.classList.add('dot-current-player');
        secondPlayerName.classList.add('font-current-player');
    } else {
        activePlayer = player1;

        playerBackground.classList.remove('turn-player-2');
        secondPlayerTurn.classList.remove('dot-current-player');
        secondPlayerName.classList.remove('font-current-player');

        playerBackground.classList.add('turn-player-1');
        firstPlayerTurn.classList.add('dot-current-player');
        firstPlayerName.classList.add('font-current-player');
    }
}