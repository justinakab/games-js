const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
const choices = ['🪨', '📄', '✂️'];

let userChoice;
let computerChoice;
let result;

possibleChoices.forEach((button) =>
  button.addEventListener('click', (e) => {
    userChoice = e.target.textContent;
    userChoiceDisplay.innerHTML = userChoice;

    const generateComputerChoice = () => {
      const randomNumber = Math.floor(Math.random() * choices.length);
      console.log(randomNumber);

      computerChoice = choices[randomNumber];
      computerChoiceDisplay.innerHTML = computerChoice;
    };

    generateComputerChoice();

    const getResult = () => {
      if (computerChoice === userChoice) {
        result = "It's a draw!";
      } else if (computerChoice === '🪨' && userChoice === '📄') {
        result = 'You won!';
      } else if (computerChoice === '🪨' && userChoice === '✂️') {
        result = 'You lost!';
      } else if (computerChoice === '📄' && userChoice === '✂️') {
        result = 'You won!';
      } else if (computerChoice === '📄' && userChoice === '🪨') {
        result = 'You lost!';
      } else if (computerChoice === '✂️' && userChoice === '🪨') {
        result = 'You won!';
      } else if (computerChoice === '✂️' && userChoice === '📄') {
        result = 'You lost!';
      }

      resultDisplay.innerHTML = result;
    };

    getResult();
  }),
);
