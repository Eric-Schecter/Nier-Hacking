import { Vector } from '../../../base';
import { sounds } from '../../../../../../sounds';
const { effectElectronic } = sounds;

abstract class Field {
  protected max = 500;
  protected radius = 0;
  protected opacityFill = 0.2;
  protected opacityLine = 0.5;
  protected count = 0;
  constructor(protected ctx: CanvasRenderingContext2D, protected pos: Vector) { }
  protected color = [255, 255, 255];
  private update = () => {
    if (this.radius <= this.max) {
      this.radius = Math.tanh(this.count / 10) * this.max;
    }
    if (this.count > 100) {
      this.opacityFill -= 0.05;
      this.opacityLine -= 0.05;
    }
  }
  private draw = () => {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(0,0,0,${this.opacityFill})`;
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = `rgba(0,0,0,${this.opacityLine})`;
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }
  protected drawEffect = () => { }
  display = () => {
    this.update();
    this.drawEffect();
    this.draw();
    this.count++;
  }
  isDead = () => {
    return this.opacityFill <= 0;
  }
}

export class FieldGravity extends Field {
  protected drawEffect = () => {
    this.ctx.save();
    const lineNum = 500;
    const lineLength = 100 * Math.random();
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = `rgba(0,0,0,${this.opacityLine})`;
    for (let i = 0; i < lineNum; i++) {
      const r = (this.radius - lineLength) * Math.random();
      const theta = Math.PI * 2 * Math.random();
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta) - lineLength / 2;
      this.ctx.moveTo(this.pos.x + x, this.pos.y + y);
      this.ctx.lineTo(this.pos.x + x, this.pos.y + y + lineLength);
    }
    this.ctx.stroke();
    this.ctx.restore();
  }
}

export class FieldConfuse extends Field {
  private soundEffect = effectElectronic.src;
  get getSoundEffect() {
    return this.soundEffect;
  }
  protected drawEffect = () => {
    if (Math.floor(this.count / 10) % 5 < 1) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = `rgb(255,255,255)`;
      this.ctx.lineWidth = 5;
      for (let i = 0; i < 20; i++) {
        const r = 500 * Math.random();
        const theta = Math.PI * 2 * Math.random();
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        this.ctx.moveTo(this.pos.x, this.pos.y);
        this.ctx.lineTo(this.pos.x + x, this.pos.y + y);
      }
      this.ctx.stroke();
    }
  }
}