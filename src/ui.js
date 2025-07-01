import {
  getDuration,
  updateScore,
  resetGame,
  pauseGame,
  resumeGame,
  startGame,
  shouldSpawn,
  setSpawnedObject,
  handleObjectClick,
  getState,
  moleEmoji,
  bombEmoji,
} from "./game.js";

const gameGrid = document.getElementById("game");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score"); // 👈 Add this
const levelEl = document.getElementById("level");
const levelUpBanner = document.getElementById("level-up-banner");

const dingSound = document.getElementById("ding-sound");
const buzzSound = document.getElementById("buzz-sound");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let objectTimeout = null;

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
}

function showLevelUpBanner(newLevel) {
  levelUpBanner.textContent = `Level Up! Welcome to Level ${newLevel}`;
  levelUpBanner.style.display = "block";
  setTimeout(() => {
    levelUpBanner.style.display = "none";
  }, 2000);
}

function spawnObject() {
  if (!shouldSpawn()) return;

  clearGrid();

  const index = Math.floor(Math.random() * 9);
  const isBomb = Math.random() < 0.2;
  const type = isBomb ? "bomb" : "mole";

  const cell = document.querySelectorAll(".hole")[index];
  cell.textContent = isBomb ? bombEmoji : moleEmoji;

  setSpawnedObject(type, index);

  objectTimeout = setTimeout(spawnObject, getDuration());
}

function handleCellClick(e) {
  const index = parseInt(e.target.dataset.index);
  const objectType = handleObjectClick(index);
  if (!objectType) return;

  const cell = e.target;

  if (objectType === "mole") {
    dingSound.currentTime = 0;
    dingSound.play();
    cell.classList.add("flash-green");
    setTimeout(() => cell.classList.remove("flash-green"), 300);

    const { score, level, leveledUp, highScore } = updateScore(10);
    scoreEl.textContent = score;
    levelEl.textContent = level;
    highScoreEl.textContent = highScore; // 👈 Update high score display

    if (leveledUp) {
      showLevelUpBanner(level);
      clearTimeout(objectTimeout);
      setTimeout(spawnObject, getDuration());
    }
  } else if (objectType === "bomb") {
    buzzSound.currentTime = 0;
    buzzSound.play();
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 400);

    const finalScore = getState().score;
    setTimeout(() => {
      alert(`Game Over! Final Score: ${finalScore}`);
      resetGame();
      clearGrid();
      updateUI();
    }, 100);
  }
}

function updateUI() {
  const { score, level, highScore } = getState();
  scoreEl.textContent = score;
  levelEl.textContent = level;
  highScoreEl.textContent = highScore; // 👈 Initial load
  updateButtonStates();
}

function startGameUI() {
  const { gameRunning, isPaused } = getState();
  if (gameRunning && !isPaused) return;

  startGame();
  if (getState().score === 0 && getState().level === 1) {
    updateScore(0); // trigger UI sync
  }

  spawnObject();
  updateUI();
}

function pauseGameUI() {
  pauseGame();
  clearTimeout(objectTimeout);
  updateButtonStates();
}

function resetGameUI() {
  resetGame();
  clearTimeout(objectTimeout);
  clearGrid();
  updateUI();
}

function updateButtonStates() {
  const { gameRunning, isPaused } = getState();
  startBtn.disabled = gameRunning && !isPaused;
  pauseBtn.disabled = !gameRunning || isPaused;
  resetBtn.disabled = !gameRunning && !isPaused;
}

startBtn.addEventListener("click", startGameUI);
pauseBtn.addEventListener("click", pauseGameUI);
resetBtn.addEventListener("click", resetGameUI);

createGrid();
updateUI();
