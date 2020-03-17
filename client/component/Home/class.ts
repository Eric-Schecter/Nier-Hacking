class Vector {
  constructor(public x: number, public y: number) { }
  add(v: Vector) {
    this.x += v.x;
    this.y += v.y;
  }
  sub(v: Vector) {
    this.x -= v.x;
    this.y -= v.y;
  }
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
  div(len: number) {
    this.x = this.x / len;
    this.y = this.y / len;
  }
  normalize() {
    const len = this.mag();
    if (len) {
      this.div(len);
    }
  }
  mult(mag: number) {
    this.x = this.x * mag;
    this.y = this.y * mag;
  }
}

class Unit {
  constructor(public ctx: CanvasRenderingContext2D, public pos: Vector) { }
  display() { }
  update(v: Vector, angle: number) { }
}

class Enemy extends Unit {
  private radius: number = 50;
  display = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgb(94,90,86)';
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
  }
}

class Player extends Unit {
  private yTop = 80;
  private yBottom = 40;
  private xBorder = 25;
  private yBorder = 10;
  private xLine = 18;
  private yLine = 15;
  private holeR = 10;
  private wingX = 30;
  private wingY = 30;
  private wingSize = 10;
  private step = 15;
  private angle = 0;
  private angleRatio = 3;

  private drawBody = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgb(212,209,194)';
    this.ctx.moveTo(this.pos.x, this.pos.y - this.yTop);
    this.ctx.lineTo(this.pos.x - this.xBorder, this.pos.y + this.yBorder);
    this.ctx.lineTo(this.pos.x, this.pos.y + this.yBottom);
    this.ctx.lineTo(this.pos.x + this.xBorder, this.pos.y + this.yBorder);
    this.ctx.closePath();
    this.ctx.fill();
  }

  private drawWing = () => {
    this.ctx.beginPath();
    this.ctx.rect(this.pos.x - this.wingX - this.wingSize / 2, this.pos.y + this.wingY - this.wingSize / 2, this.wingSize, this.wingSize);
    this.ctx.rect(this.pos.x + this.wingX - this.wingSize / 2, this.pos.y + this.wingY - this.wingSize / 2, this.wingSize, this.wingSize);
    this.ctx.fill();
  }

  private drawLine = () => {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'grey';
    this.ctx.moveTo(this.pos.x - this.xLine, this.pos.y - this.yLine)
    this.ctx.lineTo(this.pos.x, this.pos.y);
    this.ctx.moveTo(this.pos.x + this.xLine, this.pos.y - this.yLine);
    this.ctx.lineTo(this.pos.x, this.pos.y);
    this.ctx.moveTo(this.pos.x, this.pos.y + this.yBottom);
    this.ctx.lineTo(this.pos.x, this.pos.y);
    this.ctx.stroke();
  }

  private drawHole = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black';
    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.ctx.arc(this.pos.x, this.pos.y, this.holeR, 0, Math.PI * 2, false);
    this.ctx.fill();
  }

  private rotate = () => {
    this.ctx.translate(this.pos.x, this.pos.y);
    this.ctx.rotate(this.angle);
    this.ctx.translate(-this.pos.x, -this.pos.y);
  }

  display = () => {
    this.ctx.save();
    this.rotate();
    this.drawBody();
    this.drawWing();
    this.drawLine();
    this.drawHole();
    this.ctx.restore();
  }

  update = (v: Vector, angle: number) => {
    v.normalize();
    v.mult(this.step);
    this.pos.add(v);
    this.angle += angle / 180 * Math.PI * this.angleRatio;
  }
}

export { Vector, Enemy, Player };