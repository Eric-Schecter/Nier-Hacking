import { Vector } from '../Base';

export class Floor {
  constructor(protected ctx: CanvasRenderingContext2D, protected pos: Vector, private width: number, private height: number) { }
  get getSize() {
    return {
      left: this.pos.x,
      top: this.pos.y,
      right: this.pos.x + this.width,
      bottom: this.pos.y + this.height,
      width: this.width,
      height: this.height,
    }
  }
  display = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgb(190, 184, 159)';
    this.ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    this.ctx.fill();
  }
}