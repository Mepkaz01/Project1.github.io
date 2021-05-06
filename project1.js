/* ====GAME BOARD==== (reference W3 schools, CSS Tricks, MDN, www.taniarascia.com and stackoverflow)*/

//Set of Cards

const cardsArray = [{
    'name': 'number1',
    'image': 'images/number1.png',
  },
  {
    'name': 'number2',
    'image': 'images/number2.png',
  },
  {
    'name': 'number3',
    'image': 'images/number3.png',
  },
  {
    'name': 'number4',
    'image': 'images/number4.png',
  },
  {
    'name': 'number5',
    'image': 'images/number5.png',
  },
  {
    'name': 'number6',
    'image': 'images/number6.png',
  },
  {
    'name': 'number7',
    'image': 'images/number7.png',
  },
  {
    'name': 'number8',
    'image': 'images/number8.png',
  },
  {
    'name': 'number9',
    'image': 'images/number9.png',
  },
  {
    'name': 'unknown',
    'image': 'images/unknown.png',
  },
  {
    'name': 'pick2',
    'image': 'images/pick2.png',
  },
  {
    'name': 'fourcolors',
    'image': 'images/fourcolors.png',
  },
];

 

const gameTable = cardsArray
  .concat(cardsArray) // duplicates cards array
  .sort(() => 0.5 - Math.random()); // Shuffle cards in Array

// Create div for card placeholder 

const play = document.getElementById('game-table');
const table = document.createElement('section');
table.classList.add('table');
play.appendChild(table);

// I was looking into using for loop but didn't work for me. Used forEach instead to enter function
// for each array item. Each card placeholder also needs a front and back attribute to set it's own style. 

gameTable.forEach(item => {
  const { name, image } = item;

  const flipCard = document.createElement('div');
  flipCard.classList.add('flipCard');
  flipCard.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${image})`;

  table.appendChild(flipCard);
  flipCard.appendChild(front);
  flipCard.appendChild(back);
});

// Score Box (reference: example from Prject 1 readme: https://cardmatch.surge.sh/)

const scoreBox = document.querySelector('#scorebox');
const strikeCount = document.querySelector('#strike-count');
const winCount = document.querySelector('#win-count');

const displayScore = (htmlElement, score) => {
  htmlElement.innerText = parseInt(score);
}

// Create variables for each play

let count = 0; // keeps track of card clicks
let firstCard = '';
let secondCard = '';
let firstFlip = null;
let delay = 1300;
let playerScore = 0;
let playerStrikes = 0;
let totalWins;
playerScore = 0;
playerStrikes = 0;
displayScore(strikeCount, playerStrikes);

// Creates class for match in CSS

const match = () => {
  const chosen = document.querySelectorAll('.chosen');
  chosen.forEach(flipCard => {
    flipCard.classList.add('match');
    console.log('match!')
    playerScore += 1;
    
  });
};

const win = () => {
    if (playerScore >= 10); 
    totalWins += 1;
    displayScore(winCount, totalWins);
    console.log('you win!');
  }
  
  const updateWins = () => {
    if (!totalWins) {
      if (localStorage.getItem('totalWins')) {
        totalWins = localStorage.getItem('totalWins');
      } else {
        totalWins = 0;
      }
      displayScore(winCount, totalWins);
    }
};

// Create function to reset play for a strike

const resetFlips = () => {
  firstCard = '';
  secondCard = '';
  count = 0;
  firstFlip = null;
  
  var chosen = document.querySelectorAll('.chosen');
  chosen.forEach(flipCard => {
    flipCard.classList.remove('chosen');
  });
  playerStrikes += 1
    displayScore (strikeCount, playerStrikes);

};

// Add Event Listener to flip cards on click

table.addEventListener('click', event => {

  const clicked = event.target;

// Statements to add logic for chosen and chosen then run resetFlips function or chosen and match to run match function to each card placeholder

  if (
    clicked.nodeName === 'section' || //nodeName returns the name of the current Node as a string. This statement does not allow the table section outside the cards to be selected. 
    clicked === firstFlip ||  //logic so you don't click on the same cared
    clicked.parentNode.classList.contains('chosen') || //parentnode returns the parent of the specified node in the DOM tree. These two last statements find out if an element has
    clicked.parentNode.classList.contains('match')     //"chosen" or "match"
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstCard = clicked.parentNode.dataset.name; // dataset provides read/write access to a custom data attribute to allow exchange of information. This defines the firstCard value. 
      console.log(firstCard);
      clicked.parentNode.classList.add('chosen'); // parentNode looks for the div of the parent and returns the function. Adds "chosen" to card placeholder class. 
    } else {
      secondCard = clicked.parentNode.dataset.name; // this defines the secondCard value
      console.log(secondCard);
      clicked.parentNode.classList.add('chosen');
     
    }   
    
      if (firstCard && secondCard) {
      if (firstCard === secondCard) {
        setTimeout(match, delay);
                                      
      }
      setTimeout(resetFlips, delay);
                       
    }
    firstFlip = clicked;
}

});
