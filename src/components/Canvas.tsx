import { useState } from 'react';
import useCanvas from '../hooks/useCanvas';
import { Board } from '../game-of-life';

type CanvasProps = {
  cellsCount: number;
  cells: Board;
  width: number;
  height: number;
  cellSize: number;
  showGrid?: boolean;
};

const GRID_LINE_WIDTH = 1;
const GRID_LINE_COLOR = '#3B4252';
const CELL_COLOR = '#5E81AC';
const HIGHLIGHTED_CELL_COLOR = '#81A1C1';

type MousePosition = {
  x: number;
  y: number;
};

type CellPosition = {
  x: number;
  y: number;
};

const mousePositionToCellPosition = (mousePosition: MousePosition, cellSize: number): CellPosition => {
  return {
    x: Math.ceil(mousePosition.x / cellSize) - 1,
    y: Math.ceil(mousePosition.y / cellSize) - 1,
  };
};

const Canvas = ({ cellsCount, cells, width, height, cellSize, showGrid = true }: CanvasProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const drawGrid = (ctx: CanvasRenderingContext2D, cellSize: number, cellCount: number) => {
    ctx.beginPath();
    ctx.strokeStyle = GRID_LINE_COLOR;
    ctx.lineWidth = GRID_LINE_WIDTH;

    for (let i = 1; i <= cellCount; i++) {
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, ctx.canvas.height);
      ctx.stroke();

      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(ctx.canvas.width, i * cellSize);
      ctx.stroke();
    }
  };

  const drawHighlightedCell = (ctx: CanvasRenderingContext2D, cellSize: number) => {
    const { x: cellX, y: cellY } = mousePositionToCellPosition(mousePosition, cellSize);

    ctx.fillStyle = HIGHLIGHTED_CELL_COLOR;
    ctx.fillRect(
      cellX * cellSize + GRID_LINE_WIDTH,
      cellY * cellSize + GRID_LINE_WIDTH,
      cellSize - 2 * GRID_LINE_WIDTH,
      cellSize - 2 * GRID_LINE_WIDTH,
    );
  };

  const drawCell = (ctx: CanvasRenderingContext2D, cellSize: number, cellX: number, cellY: number) => {
    ctx.fillStyle = CELL_COLOR;
    ctx.fillRect(
      cellX * cellSize + GRID_LINE_WIDTH,
      cellY * cellSize + GRID_LINE_WIDTH,
      cellSize - 2 * GRID_LINE_WIDTH,
      cellSize - 2 * GRID_LINE_WIDTH,
    );
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (showGrid) {
      drawGrid(ctx, cellSize, cellsCount);
    }

    Object.keys(cells).forEach((i) => {
      Object.keys(cells[parseInt(i)]).forEach((j) => {
        drawCell(ctx, cellSize, parseInt(i), parseInt(j));
      });
    });

    drawHighlightedCell(ctx, cellSize);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      setMousePosition({
        x: e.clientX - canvasRef.current!.offsetLeft,
        y: e.clientY - canvasRef.current!.offsetTop,
      });
    }
  };

  const canvasRef = useCanvas(draw) as React.RefObject<HTMLCanvasElement>;

  return (
    <canvas
      ref={canvasRef}
      className="overflow-auto shadow-lg bg-nord-polar-night-2 rounded cursor-none"
      style={{ width, height }}
      onMouseMove={handleMouseMove}
    />
  );
};

export default Canvas;
