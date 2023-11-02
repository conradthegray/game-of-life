import { describe, test, expect } from 'vitest';
import reducer, {
  stop,
  play,
  clear,
  setBoardSize,
  setBoardState,
  toggleCell,
  setSimulationSpeed,
} from './simulationSlice';

describe('reducers', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      isPlaying: true,
      board: {},
      speed: 10,
      cellDensity: 100,
      boardSize: { width: 0, height: 0 },
    });
  });

  test('should stop the simulation', () => {
    const previousState = {
      isPlaying: true,
      board: {},
      speed: 10,
      cellDensity: 100,
      boardSize: { width: 0, height: 0 },
    };

    expect(reducer(previousState, stop())).toEqual({
      isPlaying: false,
      board: {},
      speed: 10,
      cellDensity: 100,
      boardSize: { width: 0, height: 0 },
    });
  });

  test('should start the simulation', () => {
    const previousState = {
      isPlaying: false,
      board: {},
      speed: 10,
      cellDensity: 100,
      boardSize: { width: 0, height: 0 },
    };

    expect(reducer(previousState, play())).toEqual({
      isPlaying: true,
      board: {},
      speed: 10,
      cellDensity: 100,
      boardSize: { width: 0, height: 0 },
    });
  });

  test('should clear the board', () => {
    const previousState = {
      isPlaying: true,
      board: {
        1: { 1: 1, 2: 1, 3: 1 },
      },
      speed: 10,
      cellDensity: 100,
      boardSize: { width: 0, height: 0 },
    };

    expect(reducer(previousState, clear())).toEqual({
      isPlaying: false,
      board: {},
      speed: 10,
      cellDensity: 100,
      boardSize: { width: 0, height: 0 },
    });
  });

  test('should set the board size', () => {
    const previousState = {
      isPlaying: true,
      board: {},
      speed: 10,
      cellDensity: 100,
      boardSize: { width: 0, height: 0 },
    };

    expect(reducer(previousState, setBoardSize({ width: 100, height: 200 }))).toEqual({
      isPlaying: true,
      board: {},
      speed: 10,
      cellDensity: 100,
      boardSize: { width: 100, height: 200 },
    });
  });

  test('should set the board state', () => {
    const previousState = {
      isPlaying: true,
      board: {},
      speed: 10,
      cellDensity: 100,
      boardSize: { width: 0, height: 0 },
    };

    expect(
      reducer(
        previousState,
        setBoardState({
          1: { 1: 1, 2: 1, 3: 1 },
        }),
      ),
    ).toEqual({
      isPlaying: true,
      board: {
        1: { 1: 1, 2: 1, 3: 1 },
      },
      speed: 10,
      cellDensity: 100,
      boardSize: { width: 0, height: 0 },
    });
  });

  test('should set the simulation speed', () => {
    const previousState = {
      isPlaying: true,
      board: {},
      speed: 10,
      cellDensity: 100,
      boardSize: { width: 0, height: 0 },
    };

    expect(reducer(previousState, setSimulationSpeed(1000))).toEqual({
      isPlaying: true,
      board: {},
      speed: 1000,
      cellDensity: 100,
      boardSize: { width: 0, height: 0 },
    });
  });

  describe('toggleCell', () => {
    test('it should mark cell as dead if the cell exists', () => {
      const previousState = {
        isPlaying: true,
        board: {
          1: { 1: 1, 2: 1, 3: 1 },
        },
        speed: 10,
        cellDensity: 100,
        boardSize: { width: 0, height: 0 },
      };

      expect(reducer(previousState, toggleCell({ x: 1, y: 2 }))).toEqual({
        isPlaying: true,
        board: {
          1: { 1: 1, 2: 0, 3: 1 },
        },
        speed: 10,
        cellDensity: 100,
        boardSize: { width: 0, height: 0 },
      });
    });

    test('it should add a new cell if the cell does not exist', () => {
      const previousState = {
        isPlaying: true,
        board: {
          1: { 1: 1, 2: 1, 3: 1 },
        },
        speed: 10,
        cellDensity: 100,
        boardSize: { width: 0, height: 0 },
      };

      expect(reducer(previousState, toggleCell({ x: 2, y: 2 }))).toEqual({
        isPlaying: true,
        board: {
          1: { 1: 1, 2: 1, 3: 1 },
          2: { 2: 1 },
        },
        speed: 10,
        cellDensity: 100,
        boardSize: { width: 0, height: 0 },
      });
    });
  });
});
