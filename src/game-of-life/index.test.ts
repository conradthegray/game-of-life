import { expect, test, describe } from 'vitest';

import { updateCellState, generateNewBoardState, Board, SimulationRules, CellState } from './index';
import { generateBoardFromText } from './utils';

describe("Conway's Game of Life rules", () => {
  const conwayRules: SimulationRules = {
    alive: {
      2: CellState.alive,
      3: CellState.alive,
    },
    dead: {
      3: CellState.alive,
    },
  };

  let board: Board;

  test('a live cell with two or three live neighbours should survive', () => {
    board = generateBoardFromText(`
      a - -
      - a -
      - - a
    `);

    const result = updateCellState({ x: 1, y: 1 }, board, conwayRules);
    expect(result).toBe(CellState.alive);
  });

  test('a dead cell with three live neighbours should become a live cell', () => {
    board = generateBoardFromText(`
      a - a
      - d -
      - - a
    `);

    const result = updateCellState({ x: 1, y: 1 }, board, conwayRules);
    expect(result).toBe(CellState.alive);
  });

  test('all other live cells die in the next generation', () => {
    board = generateBoardFromText(`
      a - -
      - a -
      - - -
    `);

    const result = updateCellState({ x: 1, y: 1 }, board, conwayRules);
    expect(result).toBe(CellState.dead);
  });

  test('all dead cells stay dead', () => {
    board = generateBoardFromText(`
      - - -
      - d -
      - - -
    `);

    const result = updateCellState({ x: 1, y: 1 }, board, conwayRules);
    expect(result).toBe(CellState.dead);
  });

  test('all empty cells stay dead', () => {
    board = generateBoardFromText(`
      - - -
      - - -
      - - -
    `);

    const result = updateCellState({ x: 1, y: 1 }, board, conwayRules);
    expect(result).toBe(CellState.dead);
  });

  describe('it should correctly generate common patterns', () => {
    test('it should correctly generate the blinker pattern', () => {
      const board = generateBoardFromText(`
        - - - - -
        - - a - -
        - - a - -
        - - a - -
        - - - - -
      `);

      const expectedState = generateBoardFromText(`
        - - - - -
        - - - - -
        - a a a -
        - - - - -
        - - - - -
      `);

      const result = generateNewBoardState(board, conwayRules, { width: 5, height: 5 });
      expect(result).toEqual(expectedState);
    });

    test('it should correctly generate the block pattern', () => {
      const board = generateBoardFromText(`
        - - - -
        - a a -
        - a a -
        - - - -
      `);

      const expectedState = generateBoardFromText(`
        - - - -
        - a a -
        - a a -
        - - - -
      `);

      const result = generateNewBoardState(board, conwayRules, { width: 5, height: 5 });
      expect(result).toEqual(expectedState);
    });

    test('it should correctly generate the glider pattern', () => {
      const board = generateBoardFromText(`
        - - - - -
        - a - - -
        - - a a -
        - a a - -
        - - - - -
      `);

      const expectedState = generateBoardFromText(`
        - - - - -
        - - a - -
        - - - a -
        - a a a -
        - - - - -
      `);

      const result = generateNewBoardState(board, conwayRules, { width: 5, height: 5 });
      expect(result).toEqual(expectedState);
    });
  });
});
