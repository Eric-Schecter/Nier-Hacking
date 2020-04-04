import { Vector } from '../../Base';

export class Wave {
  private max = 800;
  private radius = 0;
  private opacityFill = 0;
  private opacityLine = 0;
  constructor(protected ctx: CanvasRenderingContext2D, protected pos: Vector) { }
  protected color = [255, 255, 255];
  private update = () => {
    if (this.radius <= this.max) {
      this.radius += (this.max / 20);
    }
    this.radius <= this.max / 4
      ? this.opacityFill += 0.1
      : this.radius <= this.max
        ? this.opacityFill -= 0.05
        : this.opacityFill = 0;

    if (this.radius <= this.max / 2) {
      this.opacityLine += 0.02;
    } else if (this.radius <= this.max) {
      this.opacityLine -= 0.01;
    }
  }
  display = () => {
    this.update();
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.opacityFill})`;
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = `rgba(0,0,0,${this.opacityLine})`;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = 'white';
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }
  isDead = () => {
    return this.radius >= this.max;
  }
}

const red = (target: any):any => {
  return class extends target {
    constructor(...args: [CanvasRenderingContext2D, Vector]) {
      super(...args);
      this.color = [255, 0, 0];
    }
  }
}

@red
export class WaveRed extends Wave { }