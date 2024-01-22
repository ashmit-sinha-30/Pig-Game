'use strict';

const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');
const score0El = document.getElementById('score-0');
const score1El = document.getElementById('score-1');
const current0El = document.getElementById('current-0');
const current1El= document.getElementById('current-1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

let scores = [0,0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function(){
    currentScore = 0;
    document.getElementById(`current-${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player-active');
    player1El.classList.toggle('player-active');
}

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//Roll
btnRoll.addEventListener('click',function(){
    if(playing){
        const dice = Math.trunc(Math.random() * 6) + 1;
        //display
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //roll 1
        if(dice!== 1){
            currentScore += dice;
            document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        }else{
            switchPlayer();
        }
    }
})

//Hold
btnHold.addEventListener('click',function(){
    if(playing){
        //add
        scores[activePlayer] += currentScore;
        if(activePlayer === 0){
            score0El.textContent = scores[0];
        }else{
            score1El.textContent = scores[1];
        }

        //check
        if(scores[activePlayer] >= 100){
            playing = false;
            diceEl.classList.add('hidden')
            if(activePlayer === 0){
                player0El.classList.add('player-winner');
                player1El.classList.add('player-loser');
            }else{
                player1El.classList.add('player-winner');
                player0El.classList.add('player-loser');
            }
        }else{
            switchPlayer();
        }
    }
    
})

//New Game
btnNew.addEventListener('click',function(){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.add('player-active');
    player1El.classList.remove('player-active');
    player0El.classList.remove('player-winner');
    player1El.classList.remove('player-loser');
    player1El.classList.remove('player-winner');
    player0El.classList.remove('player-loser');
})