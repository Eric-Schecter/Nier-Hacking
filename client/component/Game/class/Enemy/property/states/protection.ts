import { Vector,Unit } from '../../../Base';

export class ProtectionField extends Unit {
  private radius = 0;
  private opacity = 0.5;
  private isFade = false;

  private drawCircle = (radius: number) => {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, radius, 0, Math.PI * 2, false);
    this.ctx.stroke();
    this.ctx.restore();
  }
  get getIsFade() {
    return this.isFade;
  }
  set setIsFade(status: boolean) {
    this.isFade = status;
  }
  private update = (pos: Vector) => {
    this.radius >= 25
      ? this.radius = 0
      : this.radius += 0.8;
    this.pos = pos;
    if (this.isFade) {
      this.opacity -= 0.01;
    }
  }
  display = (pos:Vector) => {
    this.update(pos);
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = 'white';
    this.ctx.lineWidth = 5;
    this.drawCircle(this.radius);
    this.drawCircle(this.radius + 25);
    this.drawCircle(this.radius + 50);
    this.drawCircle(this.radius + 75);
    this.ctx.restore();
  }
}

export const protection = (target: any):Function => {
  return class extends target {
    constructor(...args: Array<any>) {
      super(...args);
      this.setIsProtected = true;
    }
  }
}