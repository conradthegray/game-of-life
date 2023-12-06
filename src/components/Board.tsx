import { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import {
  setBoardSize,
  setBoardState,
  toggleCell,
  selectBoardState,
  selectBoardSize,
  selectCellDensity,
  selectIsPlaying,
  selectIsStopped,
} from '../features/simulation/simulationSlice';

import Canvas from './Canvas';
import SetupScreen from './SetupScreen';

import { generateNewBoardState, SimulationRules, CellState, CellPosition } from '../game-of-life';

const Board = () => {
  const dispatch = useAppDispatch();

  const boardState = useAppSelector(selectBoardState);
  const boardSize = useAppSelector(selectBoardSize);
  const cellsDensity = useAppSelector(selectCellDensity);
  const isPlaying = useAppSelector(selectIsPlaying);
  const isStopped = useAppSelector(selectIsStopped);

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [cellSize, setCellSize] = useState(0);
  const boardRef: React.RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (boardRef.current) {
      const boardWidth = boardRef.current.getBoundingClientRect().width;
      const boardHeight = boardRef.current.getBoundingClientRect().height;
      const cellSize = boardWidth / cellsDensity;
      const cellsVerticalNum = Math.floor(boardHeight / cellSize);

      setCellSize(cellSize);

      setCanvasSize({
        width: cellsDensity * cellSize,
        height: cellsVerticalNum * cellSize,
      });

      dispatch(
        setBoardSize({
          width: cellsDensity,
          height: cellsVerticalNum,
        }),
      );
    }
  }, [cellsDensity, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPlaying) {
        return;
      }

      const conwayRules: SimulationRules = {
        alive: {
          2: CellState.alive,
          3: CellState.alive,
        },
        dead: {
          3: CellState.alive,
        },
      };

      const newBoardState = generateNewBoardState(boardState, conwayRules, boardSize);
      dispatch(setBoardState(newBoardState));
    }, 100);

    return () => clearInterval(interval);
  });

  const handleCanvasClick = (cellCoordinates: CellPosition) => {
    dispatch(toggleCell(cellCoordinates));
  };

  return (
    <div ref={boardRef} className="flex w-full h-full place-content-center">
      {isStopped ? (
        <SetupScreen />
      ) : (
        <Canvas
          cellsCount={cellsDensity}
          cells={boardState}
          width={canvasSize.width}
          height={canvasSize.height}
          cellSize={cellSize}
          onClick={handleCanvasClick}
        />
      )}
    </div>
  );
};

export default Board;
