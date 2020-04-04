export interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  size: { width: number, height: number };
  bgRatio: number;
  ratio: number;
}