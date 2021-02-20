'use strict';
/* 82. Project #3: Pig Game */

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //getElementById is supposed to be faster but only if you're selecting thousands of elements at once
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, //final scores that accumulate
  currentScore,
  activePlayer,
  playing; //holds state of the game

//Starting conditions
const gameInit = function () {
  scores = [0, 0]; //final scores that accumulate
  currentScore = 0;
  activePlayer = 0;
  playing = true; //holds state of the game

  score0El.textContent = 0; //will convert to strings to display on page
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

gameInit();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //reassigning active player, check for player 0
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

/* 83. Rolling the Dice */
/* 84. Switching Active Player */
btnRoll.addEventListener('click', function () {
  //playing is boolean so we don't need to check if true is equal to true
  if (playing) {
    //1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; // each time we roll the dice we need to generate a new number so it needs to be inside the scope of the event listener

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      //select the score element dynamically based on which is the active player
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //go to next player
      switchPlayer();
    }
  }
});

/* 85. Holding Current Score */
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to score of active player
    scores[activePlayer] += currentScore;
    // if player is currently one:
    // score[1] = scores[1] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      // Finish Game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      playing = false;

      diceEl.classList.add('hidden');
    } else {
      // Switch Player
      switchPlayer();
    }
  }
});

//86. resetting the game
btnNew.addEventListener('click', gameInit);
