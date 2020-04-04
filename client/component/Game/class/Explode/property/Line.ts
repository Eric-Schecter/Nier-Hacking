import { Vector } from '../../Base';
import { Particle } from './Particle';

export class Line extends Particle {
  private radian = 0;
  protected loc: Vector = new Vector(this.pos.x, this.pos.y);
  protected size = { width: 5, height: 100 };
  protected opacity = Math.random() * 0.8 + 0.5;
  protected color = [225, 0, 0];

  constructor(radian: number, ...args: [CanvasRenderingContext2D, Vector]) {
    super(...args);
    this.radian = radian / 180 * Math.PI;
    this.v = new Vector(0, Math.random() * 100 + 50);
    this.acc = new Vector(-this.v.x / 40, -this.v.y / 40);
  }
  protected rotate = () => {
    this.ctx.translate(this.pos.x, this.pos.y);
    this.ctx.rotate(this.radian);
    this.ctx.translate(-this.pos.x, -this.pos.y);
  }
  display = () => {
    this.ctx.save();
    this.update();
    this.rotate();
    this.draw();
    this.ctx.restore();
  }
}