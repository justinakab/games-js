const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('.results');
const width = 15;
let aliensRemoved = [];
let currentShooterIndex = 202;
let invadersId;
let isGoingRight = true;
let direction = 1;
let results = 0;

for (let i = 0; i < width * width; i++) {
  const square = document.createElement('div');
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

console.log(squares);

// indexes for invaders
const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

function draw() {
  alienInvaders.map((index) => {
    if (!aliensRemoved.includes(index)) {
      squares[index].classList.add('invader');
    }
  });
}

draw();

squares[currentShooterIndex].classList.add('shooter');

// function for removing invaders
function remove() {
  alienInvaders.map((index) => {
    squares[index].classList.remove('invader');
  });
}

// function for moving shooters
function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter');

  switch (e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) {
        currentShooterIndex -= 1;
      }
      break;

    case 'ArrowRight':
      if (currentShooterIndex % width < width - 1) {
        currentShooterIndex += 1;
      }
      break;
  }

  squares[currentShooterIndex].classList.add('shooter');
}

document.addEventListener('keydown', moveShooter);

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;
  remove();

  if (rightEdge && isGoingRight) {
    alienInvaders.map((index, i) => {
      alienInvaders[i] += width + 1; // Move down
    });
    direction = -1;
    isGoingRight = false;
  }

  if (leftEdge && !isGoingRight) {
    alienInvaders.map((index, i) => {
      alienInvaders[i] += width - 1; // Move down
    });
    direction = 1;
    isGoingRight = true;
  }

  alienInvaders.map((index, i) => {
    alienInvaders[i] += direction;
  });

  draw();

  if (squares[currentShooterIndex].classList.contains('invader')) {
    resultDisplay.textContent = 'GAME OVER';
    clearInterval(invadersId);
  }

  if (alienInvaders.length === aliensRemoved.length) {
    resultDisplay.textContent = 'YOU WIN!';
    clearInterval(invadersId);
    const popup = document.querySelector('.popup');

    function openPopup() {
      const background = document.getElementById('bg–darker');

      popup.classList.remove('popup-hidden');

      background.classList.add('popup-background');
    }

    setTimeout(openPopup, 1000);
  }
}

invadersId = setInterval(moveInvaders, 600);

// shooting invaders
function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;

  function moveLaser() {
    if (currentLaserIndex < width) {
      clearInterval(laserId); // Stop further movement of the laser
      squares[currentLaserIndex].classList.remove('laser');

      return; // Exit the function
    }
    squares[currentLaserIndex].classList.remove('laser');
    currentLaserIndex -= width;
    squares[currentLaserIndex].classList.add('laser');

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('invader');
      squares[currentLaserIndex].classList.remove('laser');
      squares[currentLaserIndex].classList.add('boom');

      setTimeout(() => {
        squares[currentLaserIndex].classList.remove('boom');
      }, 300);

      clearInterval(laserId);

      const alienRemovedIndex = alienInvaders.indexOf(currentLaserIndex);
      if (alienRemovedIndex !== -1) {
        alienInvaders.splice(alienRemovedIndex, 1);
      }
      results++;
      resultDisplay.textContent = results;
    }
  }

  if (e.key === 'ArrowUp') {
    laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener('keydown', shoot);
