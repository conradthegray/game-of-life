import { useRef, useEffect } from 'react';

type DrawFunction = (context: CanvasRenderingContext2D, frameCount: number) => void;

const useCanvas = (draw: DrawFunction) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.scale(ratio, ratio);
    }

    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount++;
      context.clearRect(0, 0, canvas.width, canvas.height);
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
