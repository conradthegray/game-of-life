import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Board, generateRandomState, BoardSize, CellState } from '../../game-of-life';

interface SimulationState {
  isPlaying: boolean;
  isStopped: boolean;
  board: Board;
  speed: number;
  cellDensity: number;
  boardSize: BoardSize;
  initialCellsNum: number;
}

const initialState: SimulationState = {
  isPlaying: false,
  isStopped: true,
  board: {},
  speed: 10,
  cellDensity: 100,
  boardSize: { width: 0, height: 0 },
  initialCellsNum: 1000,
};

export const simulationStateSlice = createSlice({
  name: 'simulation',
  initialState,
  reducers: {
    pause: (state) => {
      state.isPlaying = false;
    },
    play: (state) => {
      state.isPlaying = true;
      state.isStopped = false;
    },
    stop: (state) => {
      state.board = {};
      state.isPlaying = false;
      state.isStopped = true;
    },
    resume: (state) => {
      state.isStopped = false;
    },
    randomise: (state, action) => {
      state.board = generateRandomState(action.payload.cellsNum, state.boardSize);
    },
    setCellDensity: (state, action) => {
      state.cellDensity = action.payload;
    },
    setInitialCellsNum: (state, action) => {
      state.initialCellsNum = action.payload;
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
export const selectIsStopped = (state: RootState) => state.simulation.isStopped;
export const selectBoardSize = (state: RootState) => state.simulation.boardSize;
export const selectCellDensity = (state: RootState) => state.simulation.cellDensity;
export const selectSimulationSpeed = (state: RootState) => state.simulation.speed;
export const selectInitialCellsNum = (state: RootState) => state.simulation.initialCellsNum;

export const {
  pause,
  play,
  stop,
  resume,
  setCellDensity,
  setInitialCellsNum,
  randomise,
  setBoardSize,
  setBoardState,
  toggleCell,
  setSimulationSpeed,
} = simulationStateSlice.actions;
export default simulationStateSlice.reducer;
