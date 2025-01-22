const cardArray = [
    { name: 'fries', img: 'images/fries.jpg' },
    { name: 'cheeseburger', img: 'images/cheeseburger.jpg' },
    { name: 'hotdog', img: 'images/hotdog.jpg' },
    { name: 'ice-cream', img: 'images/ice-cream.jpg' },
    { name: 'milkshake', img: 'images/milkshake.jpg' },
    { name: 'pizza', img: 'images/pizza.jpg' },
    { name: 'fries', img: 'images/fries.jpg' },
    { name: 'cheeseburger', img: 'images/cheeseburger.jpg' },
    { name: 'hotdog', img: 'images/hotdog.jpg' },
    { name: 'ice-cream', img: 'images/ice-cream.jpg' },
    { name: 'milkshake', img: 'images/milkshake.jpg' },
    { name: 'pizza', img: 'images/pizza.jpg' },
];

// Shuffle the card array
cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
const movesDisplay = document.querySelector('#moves');
const timerDisplay = document.querySelector('#timer');
const restartButton = document.querySelector('#restart');

let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];
let moves = 0;
let timer;
let seconds = 0;

// Start the timer
function startTimer() {
    timer = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${mins}:${secs}`;
    }, 1000);
}

// Reset the game
function resetGame() {
    clearInterval(timer);
    seconds = 0;
    moves = 0;
    cardsWon.length = 0;
    resultDisplay.textContent = '0';
    movesDisplay.textContent = '0';
    timerDisplay.textContent = '00:00';
    gridDisplay.innerHTML = '';
    cardArray.sort(() => 0.5 - Math.random());
    createBoard();
    startTimer();
}

// Create the game board
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', i);

        const cardFront = document.createElement('div');
        cardFront.classList.add('front');
        cardFront.innerHTML = '<img src="images/star.png" alt="Card Back">';

        const cardBack = document.createElement('div');
        cardBack.classList.add('back');
        const backImage = document.createElement('img');
        backImage.setAttribute('src', cardArray[i].img);
        backImage.setAttribute('alt', cardArray[i].name);
        cardBack.appendChild(backImage);

        card.appendChild(cardFront);
        card.appendChild(cardBack);
        cardContainer.appendChild(card);

        card.addEventListener('click', flipCard);
        gridDisplay.appendChild(cardContainer);
    }
}

// Check if two selected cards match
function checkMatch() {
    const cards = document.querySelectorAll('.card');
    const [optionOneId, optionTwoId] = cardsChosenIds;

    if (optionOneId === optionTwoId) {
        cards[optionOneId].classList.remove('flip');
    } else if (cardsChosen[0] === cardsChosen[1]) {
        cardsWon.push(cardsChosen);
        cards[optionOneId].parentNode.style.visibility = 'hidden';
        cards[optionTwoId].parentNode.style.visibility = 'hidden';
        resultDisplay.textContent = cardsWon.length;

        if (cardsWon.length === cardArray.length / 2) {
            clearInterval(timer);
            alert('Congratulations! You found all matches!');
        }
    } else {
        cards[optionOneId].classList.remove('flip');
        cards[optionTwoId].classList.remove('flip');
    }

    cardsChosen = [];
    cardsChosenIds = [];
    moves++;
    movesDisplay.textContent = moves;
}

// Flip the selected card
function flipCard() {
    const card = this;
    const cardId = card.getAttribute('data-id');
    if (!cardsChosenIds.includes(cardId)) {
        card.classList.add('flip');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenIds.push(cardId);

        if (cardsChosen.length === 2) {
            setTimeout(checkMatch, 600);
        }
    }
}

// Event listener for the restart button
restartButton.addEventListener('click', resetGame);

// Initialize the game
createBoard();
startTimer();
