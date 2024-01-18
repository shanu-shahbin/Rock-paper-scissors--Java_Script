let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  Ties: 0
}; 
updateScore();
let isAutoplaying = false;
let intervalId;

function autoplay() {
  if (!isAutoplaying) {
    intervalId = setInterval(() => {
      const playermove = pickComputerMove();
      playGame(playermove);
    }, 1000);
    isAutoplaying = true;
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
  }
}

function playGame(playermove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playermove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You Lose';
    } else if (computerMove === 'Paper') {
      result = 'You Win';
    } else if (computerMove === 'Scissors') {
      result = 'Tie';
    }
  } else if (playermove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie';
    } else if (computerMove === 'Paper') {
      result = 'You Lose';
    } else if (computerMove === 'Scissors') {
      result = 'You Win';
    }
  } else if (playermove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You Win';
    } else if (computerMove === 'Paper') {
      result = 'Tie';
    } else if (computerMove === 'Scissors') {
      result = 'You Lose';
    }
  }

  if (result === 'You Win') {
    score.wins += 1;
  } else if (result === 'You Lose') {
    score.losses += 1;
  } else if (result === 'Tie') {
    score.Ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScore();
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `you <img src="images/${playermove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;
}

function updateScore() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.Ties}`;
}

function pickComputerMove() {
  let computerMove = '';
  const randomnumber = Math.random();

  if (randomnumber >= 0 && randomnumber < 1 / 3) {
    computerMove = 'Rock';
  } else if (randomnumber >= 1 / 3 && randomnumber < 2 / 3) {
    computerMove = 'Paper';
  } else if (randomnumber >= 2 / 3 && randomnumber <= 1) {
    computerMove = 'Scissors';
  }

  return computerMove;
}
