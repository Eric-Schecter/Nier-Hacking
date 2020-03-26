import { Vector } from './Vector';
import { System } from './System';

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

const red = (target: any) => {
  return class extends Wave {
    constructor(...args: [CanvasRenderingContext2D, Vector]) {
      super(...args);
      this.color = [255, 0, 0];
    }
  }
}

@red
class WaveRed extends Wave { }

export class BubbleLine {
  private radius = 0;
  private radiusArr: Array<number> = [];
  private opacity = 1;
  constructor(private ctx: CanvasRenderingContext2D, private pos: Vector) {
    this.radiusArr = Array(360).fill(0).map(() => Math.random() * 40);
  }
  private draw = () => {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(233,121,55,${this.opacity})`;
    this.ctx.lineWidth = 5;
    this.radiusArr.forEach((d, i) => {
      if (i === 0) {
        this.ctx.moveTo(
          this.pos.x + Math.cos(i / 180 * Math.PI) * (d + this.radius),
          this.pos.y + Math.sin(i / 180 * Math.PI) * (d + this.radius),
        );
      } else {
        this.ctx.lineTo(
          this.pos.x + Math.cos(i / 180 * Math.PI) * (d + this.radius),
          this.pos.y + Math.sin(i / 180 * Math.PI) * (d + this.radius),
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

class ShapeSystem extends System {
  add = (pos: Vector) => {
    this.list.push(new Shape(this.ctx, pos))
  }
}

class WaveSystem extends System {
  add = (pos: Vector) => {
    this.list.push(new Wave(this.ctx, pos))
  }
}

class WaveRedSystem extends System {
  add = (pos: Vector) => {
    this.list.push(new WaveRed(this.ctx, pos))
  }
}

class ParticleSystem extends System {
  add = (pos: Vector) => {
    new Array(100).fill(0).forEach(() => this.list.push(new Particle(this.ctx, pos)));
  }
}

class LineSystem extends System {
  add = (pos: Vector) => {
    new Array(300).fill(0).forEach((d, i) => this.list.push(new Line(i * 1.2, this.ctx, pos)));
  }
}

class BubbleLineSystem extends System {
  add = (pos: Vector) => {
    new Array(1).fill(0).forEach((d, i) => this.list.push(new BubbleLine(this.ctx, pos)));
  }
}

class RaySystem extends System {
  add = (pos: Vector) => {
    new Array(1).fill(0).forEach((d, i) => this.list.push(new Ray(this.ctx, pos)));
  }
}

abstract class Effect {
  protected list: Array<any> = [];
  constructor(protected ctx: CanvasRenderingContext2D) { }
  add = (pos: Vector) => {
    this.list.forEach(d => d.add(pos));
  }
  display = () => {
    this.list.forEach(d => d.display());
  }
}

export class ExplodeEffect extends Effect {
  protected list: [ParticleSystem, WaveSystem, ShapeSystem] = [
    new ParticleSystem(this.ctx),
    new WaveSystem(this.ctx),
    new ShapeSystem(this.ctx)
  ];
}

export class ExplodeEffectPlayer extends Effect {
  protected list: [ParticleSystem, WaveSystem, LineSystem, RaySystem] = [
    new ParticleSystem(this.ctx),
    new WaveRedSystem(this.ctx),
    new LineSystem(this.ctx),
    new RaySystem(this.ctx),
  ];
  constructor(...args: [CanvasRenderingContext2D]) {
    super(...args)
  }
}

export class ExplodeEffectBullet extends Effect {
  protected list: [BubbleLineSystem] = [
    new BubbleLineSystem(this.ctx),
  ];
  constructor(...args: [CanvasRenderingContext2D]) {
    super(...args)
  }
}