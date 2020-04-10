import { Vector } from '../base';

export class Floor {
  constructor(protected ctx: CanvasRenderingContext2D, protected pos: Vector, private sWidth: number,
     private sHeight: number,private wWidth: number,private wHeight: number,
     private vWidth: number,private vHeight: number) { }
  get getSize() {
    return {
      left: this.pos.x,
      top: this.pos.y,
      right: this.sWidth + this.pos.x,
      bottom: this.sHeight + this.pos.y,
      sWidth: this.sWidth,
      sHeight: this.sHeight,
      vWidth: this.vWidth,
      vHeight: this.vHeight,
      wWidth: this.wWidth,
      wHeight: this.wHeight,
    }
  }
  display = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgb(190, 184, 159)';
    this.ctx.rect(this.pos.x, this.pos.y, this.sWidth, this.sHeight);
    this.ctx.fill();
  }
}