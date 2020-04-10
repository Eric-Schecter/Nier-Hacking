import { Vector } from '../../../base';

export class BubbleLine {
  private radius = 0;
  private radiusArr: Array<number> = [];
  private opacity = 1;
  constructor(private ctx: CanvasRenderingContext2D, private pos: Vector,private color:[number,number,number]) {
    this.radiusArr = Array(90).fill(0).map(() => Math.random() * 40);
  }
  private draw = () => {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.opacity})`;
    this.ctx.lineWidth = 5;
    this.radiusArr.forEach((d, i) => {
      if (i === 0) {
        this.ctx.moveTo(
          this.pos.x + Math.cos(i / 45 * Math.PI) * (d + this.radius),
          this.pos.y + Math.sin(i / 45 * Math.PI) * (d + this.radius),
        );
      } else {
        this.ctx.lineTo(
          this.pos.x + Math.cos(i / 45 * Math.PI) * (d + this.radius),
          this.pos.y + Math.sin(i / 45 * Math.PI) * (d + this.radius),
        );
      }
    })
    this.ctx.stroke();
    this.ctx.restore();
  }
  update = () => {
    this.opacity -= 0.15;
    this.radius += 10;
  }
  display = () => {
    this.update();
    this.draw();
  }
  isDead = () => {
    return this.opacity <= 0;
  }
}