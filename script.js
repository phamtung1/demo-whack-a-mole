const gameGrid = document.getElementById('game');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let score = 0;
let level = 1;
const maxLevel = 5;
let objectTimeout = null;
let clickedThisCycle = false;
let isPaused = false;
let isRunning = false;

const moleEmoji = '🐹';
const bombEmoji = '💣';

const levelDurations = {
  1: 1500,
  2: 1200,
  3: 1000,
  4: 800,
  5: 600
};

const getDuration = () => levelDurations[level] || 600;

const createGrid = () => {
  gameGrid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('hole');
    cell.dataset.index = i;
    gameGrid.appendChild(cell);
  }
};

const clearGrid = () => {
  document.querySelectorAll('.hole').forEach(cell => {
    cell.textContent = '';
    cell.onclick = null;
    cell.classList.remove('hit-mole', 'hit-bomb');
  });
};

const getRandomCell = () => {
  const cells = document.querySelectorAll('.hole');
  const index = Math.floor(Math.random() * cells.length);
  return cells[index];
};

const getRandomObject = () => Math.random() < 0.8 ? moleEmoji : bombEmoji;

const updateScore = (change) => {
  score = Math.max(0, score + change);
  scoreEl.textContent = score;
};

const flashCell = (cell, type) => {
  const className = type === 'mole' ? 'hit-mole' : 'hit-bomb';
  cell.classList.add(className);
  setTimeout(() => cell.classList.remove(className), 200);
};

const spawnObject = () => {
  if (!isRunning || isPaused) return;

  clearGrid();
  clickedThisCycle = false;

  const cell = getRandomCell();
  const obj = getRandomObject();
  cell.textContent = obj;

  cell.onclick = () => {
    if (clickedThisCycle || isPaused) return;
    clickedThisCycle = true;
    clearTimeout(objectTimeout);

    if (obj === moleEmoji) {
      updateScore(10);
      flashCell(cell, 'mole');

      if (score >= level * 100 && level < maxLevel) {
        level++;
        levelEl.textContent = level;
      }

      clearGrid();
      setTimeout(spawnObject, 10);
    } else {
      updateScore(-5);
      flashCell(cell, 'bomb');
      alert(`Game Over! Final Score: ${score}`);
      resetGame();
    }
  };

  objectTimeout = setTimeout(() => {
    clearGrid();
    spawnObject();
  }, getDuration());
};

const startGame = () => {
  if (!isRunning) {
    score = 0;
    level = 1;
    scoreEl.textContent = score;
    levelEl.textContent = level;
    isRunning = true;
  }
  isPaused = false;

  updateButtonStates();
  spawnObject();
};

const pauseGame = () => {
  isPaused = true;
  clearTimeout(objectTimeout);
  updateButtonStates();
};

const resetGame = () => {
  clearTimeout(objectTimeout);
  isRunning = false;
  isPaused = false;
  score = 0;
  level = 1;
  scoreEl.textContent = score;
  levelEl.textContent = level;
  clearGrid();
  updateButtonStates();
};

const updateButtonStates = () => {
  startBtn.disabled = isRunning && !isPaused;
  pauseBtn.disabled = !isRunning || isPaused;
  resetBtn.disabled = !isRunning;
};

// Event bindings
startBtn.onclick = startGame;
pauseBtn.onclick = pauseGame;
resetBtn.onclick = resetGame;

createGrid();
updateButtonStates();
