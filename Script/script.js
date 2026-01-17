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
