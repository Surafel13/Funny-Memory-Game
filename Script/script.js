const emojis = ['🍎', '🍌', '🍇', '🍊', '🍉', '🥝', '🍍', '🍑', '🍑', '🥝', '🍎', '🍌', '🍇', '🍉', '🍍', '🍊'];
let cards = [];
let flippedCards = [];
let moves = 0;
let timer = 0;
let interval;
let isGameWon = false;
let bestMoves = localStorage.getItem('bestMoves') || Infinity;

const gameBoard = document.getElementById('gameBoard');
const movesEl = document.getElementById('moves');
const timeEl = document.getElementById('time');
const bestEl = document.getElementById('best');
const winMessage = document.getElementById('winMessage');
const finalMoves = document.getElementById('finalMoves');

bestEl.textContent = bestMoves;

function initParticles() {
    const particles = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particles.appendChild(particle);
    }
}


function toggleDarkMode() {
    document.body.classList.toggle('dark');
}

function createCard(emoji, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.dataset.index = index;

    const back = document.createElement('div');
    back.className = 'card-face card-back';
    back.textContent = '❓';

    const front = document.createElement('div');
    front.className = 'card-face card-front';
    front.textContent = emoji;

    card.appendChild(back);
    card.appendChild(front);

    card.addEventListener('click', flipCard);
    return card;
}

function startGame() {
    cards = [...emojis].sort(() => Math.random() - 0.5);
    flippedCards = [];
    moves = 0;
    timer = 0;
    isGameWon = false;
    clearInterval(interval);
    updateDisplay();
    gameBoard.innerHTML = '';
    winMessage.classList.remove('show');

    cards.forEach((emoji, index) => {
        const card = createCard(emoji, index);
        gameBoard.appendChild(card);
    });

    // Flip all briefly to show
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(c => c.classList.add('flipped'));
        setTimeout(() => {
            document.querySelectorAll('.card').forEach(c => c.classList.remove('flipped'));
        }, 2000);
    }, 500);
}

function flipCard(e) {
    if (flippedCards.length >= 2 || this.classList.contains('flipped') || this.classList.contains('matched') || isGameWon) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        updateDisplay();
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
        if (document.querySelectorAll('.matched').length === cards.length) {
            winGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}


function winGame() {
    isGameWon = true;
    clearInterval(interval);
    finalMoves.textContent = moves;
    if (moves < bestMoves) {
        bestMoves = moves;
        localStorage.setItem('bestMoves', bestMoves);
        bestEl.textContent = bestMoves;
    }
    winMessage.classList.add('show');
}

function updateDisplay() {
    movesEl.textContent = moves;
    timeEl.textContent = timer;
}

function startTimer() {
    interval = setInterval(() => {
        timer++;
        updateDisplay();
    }, 1000);
}