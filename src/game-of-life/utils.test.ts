import { expect, test, describe } from 'vitest';

import { Board, CellState } from './index';
import { generateBoardFromText } from './utils';

describe('utils: generateBoardFromText', () => {
  test('it should handle empty text input', () => {
    const sampleBoard = ``;

    const expectedResult: Board = {};

    const result = generateBoardFromText(sampleBoard);
    expect(result).toEqual(expectedResult);
  });

  test('it should generate a board from a text description', () => {
    const sampleBoard = `
      a d - a
      - - a a
      a - a -
      a a a a
    `;

    const expectedResult: Board = {
      0: { 0: CellState.alive, 3: CellState.alive },
      1: { 2: CellState.alive, 3: CellState.alive },
      2: { 0: CellState.alive, 2: CellState.alive },
      3: { 0: CellState.alive, 1: CellState.alive, 2: CellState.alive, 3: CellState.alive },
    };

    const result = generateBoardFromText(sampleBoard);
    expect(result).toEqual(expectedResult);
  });
});
