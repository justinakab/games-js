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
    possibleChoices.forEach((btn) => (btn.disabled = true));

    userChoice = e.target.textContent;
    userChoiceDisplay.innerHTML = userChoice;

    const generateComputerChoice = () => {
      const randomNumber = Math.floor(Math.random() * choices.length);
      console.log(randomNumber);

      computerChoice = choices[randomNumber];

      computerChoiceDisplay.innerHTML = computerChoice;
    };

    setTimeout(generateComputerChoice, 1000);

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
    const decideColor = () => {
      if (result === 'You won!') {
        resultDisplay.classList.add('green-message');
        resultDisplay.classList.remove('red-message');
      } else if (result === 'You lost!') {
        resultDisplay.classList.remove('green-message');
        resultDisplay.classList.add('red-message');
      } else {
        resultDisplay.classList.remove('green-message');
        resultDisplay.classList.remove('red-message');
      }
    };

    const clear = () => {
      computerChoice = '';
      result = '';
      userChoice = '';

      computerChoiceDisplay.textContent = computerChoice;
      resultDisplay.textContent = result;
      userChoiceDisplay.textContent = userChoice;

      possibleChoices.forEach((btn) => (btn.disabled = false));
    };

    setTimeout(getResult, 2000);
    setTimeout(decideColor, 2000);
    setTimeout(clear, 3000);
  }),
);
