import {
  updateScore,
  resetGame,
  pauseGame,
  resumeGame,
  startGame,
  stopGame,
  getDuration,
  shouldSpawn,
  setSpawnedObject,
  handleObjectClick,
  getState,
} from '../src/game.js';

beforeEach(() => {
  resetGame();
});

describe('Scoring Logic', () => {
  test('score increases by 10 and level stays the same if under 100', () => {
    const result = updateScore(10);
    expect(result.score).toBe(10);
    expect(result.level).toBe(1);
    expect(result.leveledUp).toBe(false);
  });

  test('level increases at 100-point threshold', () => {
    let result;
    for (let i = 0; i < 10; i++) result = updateScore(10);
    expect(result.score).toBe(100);
    expect(result.level).toBe(2);
    expect(result.leveledUp).toBe(true);
  });

  test('level caps at 5 even when score > 500', () => {
    for (let i = 0; i < 100; i++) updateScore(10);
    const state = getState();
    expect(state.level).toBe(5);
  });
});

describe('Game Control Logic', () => {
  test('pauseGame sets isPaused to true', () => {
    pauseGame();
    expect(getState().isPaused).toBe(true);
  });

  test('resumeGame sets isPaused to false', () => {
    pauseGame();
    resumeGame();
    expect(getState().isPaused).toBe(false);
  });

  test('startGame enables gameRunning and unpauses', () => {
    startGame();
    const state = getState();
    expect(state.gameRunning).toBe(true);
    expect(state.isPaused).toBe(false);
  });

  test('resetGame resets score, level, and flags', () => {
    updateScore(200);
    startGame();
    pauseGame();
    resetGame();
    const state = getState();
    expect(state.score).toBe(0);
    expect(state.level).toBe(1);
    expect(state.gameRunning).toBe(false);
    expect(state.isPaused).toBe(false);
  });
});

describe('Spawn & Timer Logic', () => {
  test.each([
    [1, 1500],
    [2, 1200],
    [3, 1000],
    [4, 800],
    [5, 600],
    [999, 600], // anything above 5 still returns 600
  ])('getDuration returns correct value for level %i', (lvl, expected) => {
    resetGame();
    for (let i = 0; i < (lvl - 1) * 10; i++) updateScore(10); // increase level
    expect(getDuration()).toBe(expected);
  });

  test('shouldSpawn returns true only when game is running and not paused', () => {
    expect(shouldSpawn()).toBe(false);
    startGame();
    expect(shouldSpawn()).toBe(true);
    pauseGame();
    expect(shouldSpawn()).toBe(false);
  });
});

describe('Click Handling Logic', () => {
  test('handleObjectClick returns "mole" only if index matches and state is valid', () => {
    startGame();
    setSpawnedObject("mole", 3);
    expect(handleObjectClick(2)).toBe(null); // wrong index
    expect(handleObjectClick(3)).toBe("mole");
  });

  test('handleObjectClick returns null if paused or not running', () => {
    setSpawnedObject("mole", 1);
    expect(handleObjectClick(1)).toBe(null);
    startGame();
    pauseGame();
    expect(handleObjectClick(1)).toBe(null);
  });

  test('handleObjectClick returns "bomb" correctly and resets currentObject', () => {
    startGame();
    setSpawnedObject("bomb", 4);
    expect(handleObjectClick(4)).toBe("bomb");
    expect(getState().currentObject).toBe(null);
  });
});
