import { Vector } from '../../../base';

export class Shape {
  private max = 15;
  private side = 100;
  private count = 0;
  private opacity = 0;
  constructor(protected ctx: CanvasRenderingContext2D, protected pos: Vector) { }
  private rect = (x: number, y: number) => {
    this.ctx.rect(x, y, this.side, this.side);
  }
  private drawRect = () => {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = `rgba(0,0,0,${0.3 * this.opacity})`;
    this.rect(this.pos.x - this.side * 5 / 4, this.pos.y - this.side / 2)
    this.rect(this.pos.x + this.side * 1 / 4, this.pos.y - this.side / 2)
    this.rect(this.pos.x - this.side / 2, this.pos.y - this.side * 5 / 4)
    this.rect(this.pos.x - this.side / 2, this.pos.y + this.side * 1 / 4)
    this.ctx.stroke();
    this.ctx.restore();
  }
  private circle = (x: number, y: number) => {
    this.ctx.moveTo(x, y);
    this.ctx.arc(x, y, 10, 0, Math.PI * 2, false);
  }
  private points = (xOffset: number, yOffset: number) => {
    this.circle(this.pos.x - xOffset, this.pos.y + yOffset);
    this.circle(this.pos.x + xOffset, this.pos.y + yOffset);
    this.circle(this.pos.x - xOffset, this.pos.y - yOffset);
    this.circle(this.pos.x + xOffset, this.pos.y - yOffset);
  }
  private drawCircle = () => {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(0,0,0,${0.7 * this.opacity})`;
    this.points(this.side * 5 / 4, this.side / 2);
    this.points(this.side / 4, this.side / 2);
    this.points(this.side / 2, this.side * 5 / 4);
    this.points(this.side / 2, this.side / 4);
    this.ctx.fill();
    this.ctx.restore();
  }
  private rotate = () => {
    this.ctx.translate(this.pos.x, this.pos.y - this.side);
    this.ctx.rotate(Math.PI / 4);
    this.ctx.rect(-this.side / 4, this.side / 4, this.side * 3 / 2, this.side * 3 / 2);
    this.ctx.rect(this.side / 4, -this.side / 4, this.side * 3 / 2, this.side * 3 / 2);
    this.ctx.stroke();
    this.ctx.translate(-this.pos.x, -this.pos.y);
  }
  private drawRotateRect = () => {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = `rgba(0,0,0,${0.5 * this.opacity})`;
    this.rotate();
    this.ctx.restore();
  }
  private update = () => {
    this.count <= this.max && this.count++;
  }
  private drawRedLight = () => {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(255,255,255,${0.4 * this.opacity})`;
    this.ctx.shadowBlur = 100;
    this.ctx.shadowColor = 'red';
    this.ctx.arc(this.pos.x, this.pos.y, 50, 0, Math.PI * 2, false);
    this.ctx.fill()
    this.ctx.restore();
  }
  display = () => {
    this.update();
    if (this.count < this.max / 2) {
      this.drawRect();
      this.drawCircle();
      this.opacity += 0.1;
    } else {
      this.drawRotateRect();
      this.opacity -= 0.1;
    }
    this.drawRedLight();
  }
  isDead = () => {
    return this.count >= this.max;
  }
}