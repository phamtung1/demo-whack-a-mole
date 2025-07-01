// gameLogic.js
const moleEmoji = "🐹";
const bombEmoji = "💣";

const levelSpeeds = {
  1: 1500,
  2: 1200,
  3: 1000,
  4: 800,
  5: 600,
};

let state = {
  score: 0,
  level: 1,
  maxLevel: 5,
  isPaused: false,
  gameRunning: false,
  currentObject: null,
  objectIndex: null,
  highScore: loadHighScore(),
};

function getDuration() {
  return levelSpeeds[state.level] || 600;
}

// Load high score from localStorage
function loadHighScore() {
  return parseInt(localStorage.getItem("highScore")) || 0;
}

// Save high score to localStorage
function saveHighScore(newHighScore) {
  localStorage.setItem("highScore", newHighScore);
}

// Call this when updating score
function updateScore(change) {
  state.score = Math.max(0, state.score + change);
  if (state.score > state.highScore) {
    state.highScore = state.score;
    saveHighScore(state.highScore);
  }
  const newLevel = Math.min(state.maxLevel, Math.floor(state.score / 100) + 1);
  const leveledUp = newLevel > state.level;
  state.level = newLevel;
  return {
    score: state.score,
    level: state.level,
    leveledUp,
    highScore: state.highScore,
  };
}

function resetGame() {
  state.score = 0;
  state.level = 1;
  state.isPaused = false;
  state.gameRunning = false;
  state.currentObject = null;
  state.objectIndex = null;
}

function pauseGame() {
  state.isPaused = true;
}

function resumeGame() {
  state.isPaused = false;
}

function startGame() {
  state.gameRunning = true;
  state.isPaused = false;
}

function stopGame() {
  state.gameRunning = false;
  state.isPaused = false;
}

function shouldSpawn() {
  return state.gameRunning && !state.isPaused;
}

function setSpawnedObject(type, index) {
  state.currentObject = type;
  state.objectIndex = index;
}

function handleObjectClick(index) {
  if (!state.gameRunning || state.isPaused || state.currentObject === null)
    return null;
  if (index !== state.objectIndex) return null;
  const type = state.currentObject;
  state.currentObject = null;
  return type;
}

function getState() {
  return { ...state };
}

export {
  getDuration,
  updateScore,
  resetGame,
  pauseGame,
  resumeGame,
  startGame,
  stopGame,
  shouldSpawn,
  setSpawnedObject,
  handleObjectClick,
  getState,
  moleEmoji,
  bombEmoji,
};
