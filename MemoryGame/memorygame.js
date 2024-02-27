const cardArray = [
  {
    name: 'alien',
    image: './img/alien.png',
  },
  {
    name: 'astronaut',
    image: './img/astronaut.png',
  },
  {
    name: 'black-moon',
    image: './img/black-moon.png',
  },
  {
    name: 'light-moon',
    image: './img/light-moon.png',
  },
  {
    name: 'rocket',
    image: './img/rocket.png',
  },
  {
    name: 'saturn',
    image: './img/saturn.png',
  },
  {
    name: 'alien',
    image: './img/alien.png',
  },
  {
    name: 'astronaut',
    image: './img/astronaut.png',
  },
  {
    name: 'black-moon',
    image: './img/black-moon.png',
  },
  {
    name: 'light-moon',
    image: './img/light-moon.png',
  },
  {
    name: 'rocket',
    image: './img/rocket.png',
  },
  {
    name: 'saturn',
    image: './img/saturn.png',
  },
];

// shuffle cardArray randomly
cardArray.sort(() => 0.5 - Math.random());

console.log(cardArray);

// const
const grid = document.getElementById('grid');
const resultDisplay = document.getElementById('result');
resultDisplay.innerHTML = '0';
let cardsChosen = [];
let cardChosenIds = [];
const cardsWon = [];
let messageDisplay = document.getElementById('message');

const createBoard = () => {
  cardArray.forEach((object, index) => {
    const card = document.createElement('img');
    card.setAttribute('src', './img/back.png');
    card.setAttribute('data-id', index);
    grid.appendChild(card);

    card.classList.add('card');
    card.addEventListener('click', flipCard);
  });
};

createBoard();

let isChecking = false;

// flip card

function flipCard() {
  if (isChecking) {
    return;
  }

  const cardId = this.getAttribute('data-id');
  console.log('clicked', cardId);

  cardChosenIds.push(cardId);

  console.log(cardChosenIds);

  const cardObject = cardArray[cardId];

  this.setAttribute('src', cardObject.image);
  cardsChosen.push(cardObject.name);
  console.log(cardsChosen);

  if (cardsChosen.length === 2) {
    isChecking = true;
    setTimeout(checkMatch, 500);
  }
}

// checking the match

function checkMatch() {
  console.log('check');

  const cards = document.querySelectorAll('img');
  const optionOneId = cardChosenIds[0];
  const optionTwoId = cardChosenIds[1];
  let message = '';

  // if the same card is clicked
  if (optionOneId === optionTwoId) {
    message = 'You have clicked to same image';
    messageDisplay.innerHTML = message;
    setTimeout(() => {
      messageDisplay.innerHTML = '';
    }, 1000);
    cards[optionOneId].setAttribute('src', 'img/back.png');
    cards[optionTwoId].setAttribute('src', 'img/back.png');
  }

  // if there's a match
  else if (cardsChosen[0] === cardsChosen[1]) {
    message = "It's a match!";
    messageDisplay.innerHTML = message;
    setTimeout(() => {
      messageDisplay.innerHTML = '';
    }, 1000);

    cards[optionOneId].setAttribute('src', 'img/white.png');
    cards[optionTwoId].setAttribute('src', 'img/white.png');
    cards[optionOneId].removeEventListener('click', flipCard);
    cards[optionTwoId].removeEventListener('click', flipCard);

    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute('src', 'img/back.png');
    cards[optionTwoId].setAttribute('src', 'img/back.png');
  }

  messageDisplay.innerHTML = message;
  resultDisplay.innerHTML = cardsWon.length;

  cardsChosen = [];
  cardChosenIds = [];

  isChecking = false;
  // popup

  if (cardsWon.length === cardArray.length / 2) {
    const popup = document.querySelector('.popup');

    function openPopup() {
      const background = document.getElementById('bg–darker');

      popup.classList.remove('popup-hidden');

      background.classList.add('popup-background');
    }

    openPopup();
  }
}
