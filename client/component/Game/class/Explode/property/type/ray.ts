import { Vector } from '../../../base';

export class Ray {
  private count = 0;
  private distanceL = 500;
  private distanceS = 10;
  constructor(private ctx: CanvasRenderingContext2D, private pos: Vector) { }
  private drawLine = (dl: number, ds: number) => {
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(255,0,0,${Math.cos(this.count / 180 * Math.PI) * 0.8})`;
    this.ctx.strokeStyle = `rgba(255,0,0,${Math.cos(this.count / 180 * Math.PI) * 0.3})`;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = `white`;
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(this.pos.x - dl, this.pos.y);
    this.ctx.lineTo(this.pos.x - ds, this.pos.y + ds);
    this.ctx.lineTo(this.pos.x, this.pos.y + dl);
    this.ctx.lineTo(this.pos.x + ds, this.pos.y + ds);
    this.ctx.lineTo(this.pos.x + dl, this.pos.y);
    this.ctx.lineTo(this.pos.x + ds, this.pos.y - ds);
    this.ctx.lineTo(this.pos.x, this.pos.y - dl);
    this.ctx.lineTo(this.pos.x - ds, this.pos.y - ds);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }
  private drawCircle = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(255,0,0,${Math.cos(this.count / 180 * Math.PI) * 0.5})`;
    this.ctx.arc(this.pos.x, this.pos.y, Math.tanh(this.count / 10) * 100, 0, Math.PI * 2, false);
    this.ctx.fill();
  }
  private draw = () => {
    this.ctx.save();
    this.drawLine(this.distanceL * Math.tanh(this.count / 10), this.distanceS * Math.tanh(this.count / 10));
    this.drawCircle();
    this.ctx.restore();
  }
  private update = () => {
    this.count += 10;
  }
  display = () => {
    this.update();
    this.draw();
  }
  isDead = () => {
    return this.count >= 180;
  }
}