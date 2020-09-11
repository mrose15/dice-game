/*
GAME RULES:
- The game has 2 players, playing in rounds
- To start, enter the total number of points to win in the "Set Winning Score" field, click Submit. If the players choose not to set a Winning Score, the default is set to 100 points.
- For each turn, a player rolls the dice as many times as they wish. Each result gets added to the player's Round score by clicking the Hold button
- The player can choose to 'Hold', which means that their Round score gets added to their Global score. After that, it's the next player's turn
- If the player rolls a 1 or two 6s in a row, the entire Round score gets lost. After that, it's the next player's turn
- The first player to reach the number of points in the "Set Winning Score" field wins the game
- Players can click "New Game" to clear the game and start again
*/

var scores, roundScore, activePlayer, gamePlaying, lastDice1, lastDice2, winningScore, diceDisplay;
init();
 
// to roll dice
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1. generate random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. display result
        var diceDOM1 = document.querySelector('.dice-1');
        var diceDOM2 = document.querySelector('.dice-2');
        diceDOM1.src = 'dice-' + dice1 + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        changeDiceDisplay('show');

        if ((dice1 === 6 && lastDice1 === 6) || (dice2 === 6 && lastDice2 === 6)){
            //player loses score
            scores[activePlayer] = 0;
            document.querySelector('#current-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1){ // both
            // add score
            roundScore += dice1 + dice2; // have access to global scope
            //to display roundScore
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
        } else {
            nextPlayer();
        }
        // storing the previous dice roll in a variable outside the if condition and initialized outside of this function is enough to keep history
        lastDice1 = dice1;
        lastDice2 = dice2;
        
    }
});

//to hold score
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //1. add current score to global score
        //compounding score
        scores[activePlayer] += roundScore;

        //2. update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // to submit winning score
        var input = parseInt(document.getElementById('winning-score').value);

        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if (input){
            winningScore = input;
        } else {
            winningScore = 20;
        }
       
        //3. check if player won game
        console.log(winningScore);
        console.log(scores[activePlayer]);
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            //create class and set styles in CSS, don't use style display too often
            changeDiceDisplay('hide');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            gamePlaying = false; //state variable
        }else{
            //go to next player
            nextPlayer();
        }
    }
});  

function nextPlayer(){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        changeDiceDisplay('hide');
}

//to clear game
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true; // set state to true in init function
    changeDiceDisplay('hide');

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//controls show/hide class for display
function changeDiceDisplay(hideShowClass){
    diceDisplay = document.querySelectorAll('.dice');
    for (var i = 0; i < diceDisplay.length; i++) {
        if (hideShowClass == 'hide'){
            diceDisplay[i].classList.add('hide');
            diceDisplay[i].classList.remove('show');
        }else{
            diceDisplay[i].classList.remove('hide');
            diceDisplay[i].classList.add('show');
        }
    }
    return hideShowClass;
};