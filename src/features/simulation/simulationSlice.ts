import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Board, generateRandomState, BoardSize, CellState } from '../../game-of-life';

interface SimulationState {
  isPlaying: boolean;
  board: Board;
  speed: number;
  cellDensity: number;
  boardSize: BoardSize;
}

const initialState: SimulationState = {
  isPlaying: true,
  board: {},
  speed: 10,
  cellDensity: 100,
  boardSize: { width: 0, height: 0 },
};

export const simulationStateSlice = createSlice({
  name: 'simulation',
  initialState,
  reducers: {
    stop: (state) => {
      state.isPlaying = false;
    },
    play: (state) => {
      state.isPlaying = true;
    },
    clear: (state) => {
      state.board = {};
      state.isPlaying = false;
    },
    randomise: (state, action) => {
      state.board = generateRandomState(action.payload.cellsNum, state.boardSize);
    },
    setBoardSize: (state, action) => {
      state.boardSize = action.payload;
    },
    setBoardState: (state, action) => {
      state.board = action.payload;
    },
    toggleCell: (state, action) => {
      const { x, y } = action.payload;

      if (state.board?.[x]?.[y]) {
        state.board[x][y] = state.board[x][y] === CellState.alive ? CellState.dead : CellState.alive;
      } else {
        if (!state.board[x]) {
          state.board[x] = {};
        }

        state.board[x][y] = CellState.alive;
      }
    },
    setSimulationSpeed: (state, action) => {
      state.speed = action.payload;
    },
  },
});

export const selectBoardState = (state: RootState) => state.simulation.board;
export const selectIsPlaying = (state: RootState) => state.simulation.isPlaying;
export const selectBoardSize = (state: RootState) => state.simulation.boardSize;
export const selectCellDensity = (state: RootState) => state.simulation.cellDensity;
export const selectSimulationSpeed = (state: RootState) => state.simulation.speed;

export const { stop, play, clear, randomise, setBoardSize, setBoardState, toggleCell, setSimulationSpeed } =
  simulationStateSlice.actions;
export default simulationStateSlice.reducer;
