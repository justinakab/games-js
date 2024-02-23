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

const grid = document.getElementById('grid');

const createBoard = () => {
  cardArray.forEach((object) => {
    const card = document.createElement('img');
    card.setAttribute('src', object.image);
    grid.appendChild(card);
    card.classList.add('card');
  });
};

createBoard();
