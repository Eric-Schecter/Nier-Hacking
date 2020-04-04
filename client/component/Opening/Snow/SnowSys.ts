import { Vector } from "../../Game/class";

class Snow {
  private life = this.size / 10;
  private count = 0;
  private ax = 0;
  constructor(private ctx: CanvasRenderingContext2D, private pos: Vector, private size: number) { }
  borderCheck = (width: number, height: number) => {
    return this.pos.x < 0 || this.pos.x > width || this.pos.y > height
  }
  lifeCheck = () => {
    return this.life > 0;
  }
  private update = (ax: number) => {
    this.ax += ax;
    this.pos.x += this.ax / (this.size * this.size);
    this.pos.y += this.size / 2;
    if (this.count % 100 === 0) {
      this.life -= 0.1;
    }
    this.count++;
  }
  display = (ax: number) => {
    this.update(ax);
    this.ctx.beginPath()
    this.ctx.fillStyle = `rgba(255,255,255,${this.life})`;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = 'white';
    this.ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2, false);
    this.ctx.fill();
  }
}

export class SnowSys {
  private list: Array<Snow> = [];
  private count = 0;
  constructor(private ctx: CanvasRenderingContext2D, private width: number, private height: number) { }
  private add = () => {
    this.list.push(new Snow(this.ctx, new Vector(Math.random() * this.width, 0), Math.random() * 10))
  }
  private remove = (i: number) => {
    this.list.splice(i, 1);
  }
  display = () => {
    for (let i = this.list.length - 1; i >= 0; i--) {
      if (this.list[i].borderCheck(this.width, this.height) || !this.list[i].lifeCheck()) {
        this.remove(i);
      }
    }
    if (this.list.length < 100 && this.count % 10 === 0) {
      this.add();
    }
    this.list.forEach(d => d.display((Math.random() - 0.5) * 10))
    this.count++;
  }
}