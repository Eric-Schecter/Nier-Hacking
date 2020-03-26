import { Vector } from "./Vector";

export class Block {
  private width: number = 90;
  private height: number = 90;
  constructor(protected ctx: CanvasRenderingContext2D,protected pos: Vector) { }
  display = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle='white';
    this.ctx.strokeStyle='grey';
    this.ctx.rect(this.pos.x,this.pos.y,this.width,this.height);
    this.ctx.fill();
    this.ctx.stroke();
  }
}

export class Blocks {
  private list: Array<Block> = [];
  display = () => {
    this.list.forEach(d => d.display());
  }
}