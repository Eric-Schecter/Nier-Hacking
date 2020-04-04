import { Vector } from '../../Base';

export class Particle {
  protected loc: Vector = new Vector(this.pos.x + (Math.random() - 0.5) * 100, this.pos.y + (Math.random() - 0.5) * 100);
  protected v: Vector = new Vector((Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150);
  protected acc: Vector = new Vector(-this.v.x / 40, -this.v.y / 40);
  protected size = { width: (Math.random() - 0.5) * 90 + 10, height: (Math.random() - 0.5) * 90 + 10 };
  protected opacity = Math.random() * 0.5 + 0.5;
  protected color = [0, 0, 0];
  constructor(protected ctx: CanvasRenderingContext2D, protected pos: Vector) { }
  protected update = () => {
    this.v.mag() < 0
      ? this.v = new Vector(0, 0)
      : this.v.add(this.acc);

    this.loc.add(this.v);
    this.opacity -= 0.03;
  }
  protected draw = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.opacity})`;
    this.ctx.rect(
      this.loc.x,
      this.loc.y,
      this.size.width,
      this.size.height
    );
    this.ctx.fill();
  }
  display = () => {
    this.update();
    this.draw();
  }
  isDead = () => {
    return this.opacity <= 0;
  }
}
