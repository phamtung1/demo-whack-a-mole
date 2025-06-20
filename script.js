const gameGrid = document.getElementById('game');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');

let score = 0;
let level = 1;
const maxLevel = 5;
let objectTimeout = null;
let clickedThisCycle = false;

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
  clearGrid();
  clickedThisCycle = false;

  const cell = getRandomCell();
  const obj = getRandomObject();
  cell.textContent = obj;

  cell.onclick = () => {
    if (clickedThisCycle) return;
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
    } else if (obj === bombEmoji) {
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

const resetGame = () => {
  clearTimeout(objectTimeout);
  score = 0;
  level = 1;
  scoreEl.textContent = score;
  levelEl.textContent = level;
  clearGrid();
  setTimeout(spawnObject, 100);
};

createGrid();
spawnObject();
