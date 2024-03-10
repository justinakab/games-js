document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const flagsleft = document.querySelector('#flags-left');
  const result = document.querySelector('#result');
  const width = 10;
  let bombAmount = 20;
  let squares = [];
  let isGameOver = false;
  let flags = 0;

  // create board
  function createBoard() {
    flagsleft.innerHTML = bombAmount;

    // get shuffled game array with random bombs
    const bombArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width * width - bombAmount).fill('valid');
    const gameArray = emptyArray.concat(bombArray);
    const shuffleArray = gameArray.sort(() => Math.random() - 0.5);
    console.log(shuffleArray);

    // making squares
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.id = i;
      square.classList.add(shuffleArray[i]);
      grid.appendChild(square);
      squares.push(square);

      // normal click
      square.addEventListener('click', function (e) {
        click(square);
      });

      // control and left click
      square.addEventListener('contextmenu', function (e) {
        e.preventDefault(); // Prevent default context menu
        addFlag(square);
      });

      square.addEventListener('click', function (e) {
        if (e.ctrlKey) {
          e.preventDefault(); // Prevent default context menu
          addFlag(square);
        } else {
          click(square);
        }
      });
    }

    // add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      console.log(squares);
      if (squares[i].classList.contains('valid')) {
        // is bomb on the left?
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) {
          total++;
        }
        if (
          i > 9 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains('bomb')
        ) {
          total++;
        }
        if (i > 10 && squares[i - width].classList.contains('bomb')) {
          total++;
        }
        if (
          i > 11 &&
          !isLeftEdge &&
          squares[i - width - 1].classList.contains('bomb')
        ) {
          total++;
        }

        // is on the right or right down?
        if (
          i < 99 &&
          !isRightEdge &&
          squares[i + 1].classList.contains('bomb')
        ) {
          total++;
        }
        if (
          i < 90 &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains('bomb')
        ) {
          total++;
        }
        if (
          i < 88 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains('bomb')
        ) {
          total++;
        }
        if (i < 89 && squares[i + width].classList.contains('bomb')) {
          total++;
        }
        squares[i].setAttribute('data', total);
      }
    }
  }

  createBoard();

  // add flag with right click
  function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains('checked') && flags < bombAmount) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag');
        flags++;
        square.innerHTML = '🚩'; // Displaying the flag icon
        flagsleft.innerHTML = bombAmount - flags;
        checkWin();
      } else {
        square.classList.remove('flag');
        flags--;
        square.innerHTML = ''; // Clearing the flag icon
        flagsleft.innerHTML = bombAmount - flags;
      }
    }
  }

  function click(square) {
    console.log(square);

    if (
      isGameOver ||
      square.classList.contains('checked') ||
      square.classList.contains('flag')
    )
      return;

    if (square.classList.contains('bomb')) {
      gameOver();
    } else {
      // show how many bombs there are
      let totalbombs = square.getAttribute('data');
      if (totalbombs != 0) {
        if (totalbombs == 1) {
          square.classList.add('one');
        }
        if (totalbombs == 2) {
          square.classList.add('two');
        }
        if (totalbombs == 3) {
          square.classList.add('three');
        }
        if (totalbombs == 4) {
          square.classList.add('four');
        }
        if (totalbombs == 5) {
          square.classList.add('five');
        }
        square.innerHTML = totalbombs;
        return;
      }
      checkSquare(square);
    }

    square.classList.add('checked');
  }

  // check neighboring squares once square is clicked
  function checkSquare(square) {
    const currentId = square.id;
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = currentId - 1;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      if (currentId > 9 && !isRightEdge) {
        const newId = parseInt(currentId) + 1 - width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      if (currentId > 10) {
        const newId = parseInt(currentId) - width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = parseInt(currentId) - 1 - width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      if (currentId < 98 && !isRightEdge) {
        const newId = parseInt(currentId) + 1;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      if (currentId < 90 && !isLeftEdge) {
        const newId = parseInt(currentId) - 1 + width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      if (currentId < 88 && !isRightEdge) {
        const newId = parseInt(currentId) + 1 + width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      if (currentId < 89) {
        const newId = parseInt(currentId) + width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 10);
  }

  function checkWin() {
    let matches = 0;

    for (let i = 0; i < squares.length; i++) {
      if (
        squares[i].classList.contains('flag') &&
        squares[i].classList.contains('bomb')
      ) {
        matches++;
      }
      if (matches === bombAmount) {
        result.innerHTML = 'YOU WIN!';
        isGameOver = true;
      }
    }
    console.log(matches);
  }

  function gameOver() {
    result.innerHTML = 'BOOM! Game Over';
    isGameOver = true;

    // show all the bombs
    squares.forEach((square) => {
      if (square.classList.contains('bomb')) {
        square.innerHTML = '💣';
        square.classList.remove('bomb');
        square.classList.add('checked');
      }
    });
  }
});
