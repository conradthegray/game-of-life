import { Board, CellState } from './index';

export const generateBoardFromText = (text: string): Board => {
  const board: Board = {};

  text
    .trim()
    .split('\n')
    .forEach((line, i) => {
      line
        .trim()
        .split(' ')
        .forEach((state, j) => {
          if (state === 'a') {
            if (!board[i]) {
              board[i] = {};
            }

            board[i][j] = CellState.alive;
          }
        });
    });

  return board;
};
