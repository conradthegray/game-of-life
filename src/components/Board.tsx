import { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import {
  setBoardSize,
  setBoardState,
  selectBoardState,
  selectBoardSize,
  selectCellDensity,
  selectIsPlaying,
} from '../features/simulation/simulationSlice';

import Canvas from './Canvas';

import { generateRandomState, generateNewBoardState, SimulationRules, CellState } from '../game-of-life';

const Board = () => {
  const dispatch = useAppDispatch();

  const cells = useAppSelector(selectBoardState);
  const boardSize = useAppSelector(selectBoardSize);
  const cellsDensity = useAppSelector(selectCellDensity);
  const isPlaying = useAppSelector(selectIsPlaying);

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
        setBoardState(
          generateRandomState(1000, {
            width: cellsDensity,
            height: cellsVerticalNum,
          }),
        ),
      );

      dispatch(
        setBoardSize({
          width: cellsDensity,
          height: cellsVerticalNum,
        }),
      );
    }
  }, []);

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

      const newBoardState = generateNewBoardState(cells, conwayRules, boardSize);
      dispatch(setBoardState(newBoardState));
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <div ref={boardRef} className="flex w-full h-full place-content-center">
      <Canvas
        cellsCount={cellsDensity}
        cells={cells}
        width={canvasSize.width}
        height={canvasSize.height}
        cellSize={cellSize}
      />
    </div>
  );
};

export default Board;
