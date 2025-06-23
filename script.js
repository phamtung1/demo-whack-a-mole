const gameGrid = document.getElementById("game");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const levelUpBanner = document.getElementById("level-up-banner");

const dingSound = document.getElementById("ding-sound");
const buzzSound = document.getElementById("buzz-sound");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let score = 0;
let level = 1;
let maxLevel = 5;
let objectTimeout = null;
let currentObject = null;
let objectIndex = null;
let gameRunning = false;
let isPaused = false;

const moleEmoji = "🐹";
const bombEmoji = "💣";

const levelSpeeds = {
  1: 1500,
  2: 1200,
  3: 1000,
  4: 800,
  5: 600,
};

function createGrid() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("hole");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    gameGrid.appendChild(cell);
  }
}

function clearGrid() {
  document.querySelectorAll(".hole").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("flash-green");
  });
  currentObject = null;
  objectIndex = null;
}

function getDuration() {
  return levelSpeeds[level] || 600;
}

function showLevelUpBanner() {
  levelUpBanner.textContent = `Level Up! Welcome to Level ${level}`;
  levelUpBanner.style.display = "block";
  setTimeout(() => {
    levelUpBanner.style.display = "none";
  }, 2000);
}

function spawnObject() {
  if (!gameRunning || isPaused) return;

  clearGrid();

  const index = Math.floor(Math.random() * 9);
  const cell = document.querySelectorAll(".hole")[index];
  const isBomb = Math.random() < 0.2;

  currentObject = isBomb ? "bomb" : "mole";
  objectIndex = index;
  cell.textContent = isBomb ? bombEmoji : moleEmoji;

  objectTimeout = setTimeout(spawnObject, getDuration());
}

function handleCellClick(e) {
  if (!gameRunning || isPaused || currentObject === null) return;

  const clickedIndex = parseInt(e.target.dataset.index);
  if (clickedIndex !== objectIndex) return;

  const cell = e.target;
  const objectType = currentObject;

  currentObject = null;
  clearGrid();

  if (objectType === "mole") {
    dingSound.currentTime = 0;
    dingSound.play();

    cell.classList.add("flash-green");
    setTimeout(() => cell.classList.remove("flash-green"), 300);

    updateScore(10);
  } else {
    buzzSound.currentTime = 0;
    buzzSound.play();

    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 400);

    setTimeout(() => {
      alert(`Game Over! Final Score: ${score}`);
      resetGame();
    }, 100);
  }
}

function updateScore(change) {
  score = Math.max(0, score + change);
  scoreEl.textContent = score;

  const newLevel = Math.min(maxLevel, Math.floor(score / 100) + 1);
  if (newLevel > level) {
    level = newLevel;
    levelEl.textContent = level;
    showLevelUpBanner();
    clearTimeout(objectTimeout);
    setTimeout(spawnObject, getDuration());
  }
}

function startGame() {
  if (gameRunning && !isPaused) return;
  gameRunning = true;
  isPaused = false;

  if (score === 0 && level === 1) {
    updateScore(0); // trigger UI
  }

  spawnObject();
  updateButtonStates();
}

function pauseGame() {
  isPaused = true;
  clearTimeout(objectTimeout);
  updateButtonStates();
}

function resetGame() {
  gameRunning = false;
  isPaused = false;
  score = 0;
  level = 1;

  scoreEl.textContent = score;
  levelEl.textContent = level;
  clearTimeout(objectTimeout);
  clearGrid();
  updateButtonStates();
}

function updateButtonStates() {
  startBtn.disabled = gameRunning && !isPaused;
  pauseBtn.disabled = !gameRunning || isPaused;
  resetBtn.disabled = !gameRunning && !isPaused;
}

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);
resetBtn.addEventListener("click", resetGame);

createGrid();
updateButtonStates();
