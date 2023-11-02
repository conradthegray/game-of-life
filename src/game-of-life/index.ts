type Position = {
  x: number;
  y: number;
};

export enum CellState {
  alive = 1,
  dead = 0,
}

export type SimulationRules = {
  alive: {
    [neighbours: number]: CellState;
  };
  dead: {
    [neighbours: number]: CellState;
  };
};

export type Board = {
  [key: number]: {
    [key: number]: CellState;
  };
};

export type BoardSize = {
  width: number;
  height: number;
};

export const updateCellState = (cellPosition: Position, board: Board, rules: SimulationRules): CellState => {
  const cell = board?.[cellPosition.x]?.[cellPosition.y];
  const numberOfNeighbours = countNeighbours(cellPosition, board);

  if (cell === CellState.alive) {
    if (rules.alive[numberOfNeighbours] !== undefined) {
      return rules.alive[numberOfNeighbours];
    }
  } else {
    if (rules.dead[numberOfNeighbours] !== undefined) {
      return rules.dead[numberOfNeighbours];
    }
  }

  return CellState.dead;
};

export const generateNewBoardState = (board: Board, rules: SimulationRules, boardSize: BoardSize): Board => {
  const newBoard: Board = {};

  for (let i = 0; i < boardSize.width; i++) {
    for (let j = 0; j < boardSize.height; j++) {
      const cellNextState = updateCellState({ x: i, y: j }, board, rules);

      if (cellNextState === CellState.alive) {
        if (!newBoard[i]) {
          newBoard[i] = {};
        }

        newBoard[i][j] = CellState.alive;
      }
    }
  }

  return newBoard;
};

export const generateRandomState = (cellsNum: number, boardSize: BoardSize) => {
  const newBoard: Board = {};
  let totalCells = 0,
    x,
    y;

  while (totalCells <= cellsNum) {
    x = Math.floor(Math.random() * (boardSize.width + 1));
    y = Math.floor(Math.random() * (boardSize.height + 1));

    if (newBoard?.[x]?.[y] === undefined) {
      if (newBoard[x] === undefined) {
        newBoard[x] = {};
      }

      newBoard[x][y] = 1;
      totalCells += 1;
    }
  }

  return newBoard;
};

const countNeighbours = (cellPosition: Position, board: Board): number => {
  let result = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      if (
        board[cellPosition.x + i] !== undefined &&
        board[cellPosition.x + i][cellPosition.y + j] !== undefined &&
        board[cellPosition.x + i][cellPosition.y + j] === CellState.alive
      ) {
        result += 1;
      }
    }
  }

  return result;
};
