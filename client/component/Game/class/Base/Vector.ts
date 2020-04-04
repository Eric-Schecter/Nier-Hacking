export class Vector {
  constructor(public x: number, public y: number) { }
  add = (v: Vector) => {
    this.x += v.x;
    this.y += v.y;
  }
  sub = (v: Vector) => {
    this.x -= v.x;
    this.y -= v.y;
  }
  mag = () => {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
  div = (len: number) => {
    this.x = this.x / len;
    this.y = this.y / len;
  }
  normalize = () => {
    const len = this.mag();
    if (len) {
      this.div(len);
    }
  }
  mult = (mag: number) => {
    this.x = this.x * mag;
    this.y = this.y * mag;
  }
  dot = (v: Vector) => {
    return this.x * v.x + this.y * v.y;
  }
  getRadius = (v: Vector) => {
    return Math.acos(this.dot(v) / (this.mag() * v.mag()))
  }
  dis = (pos: Vector) => {
    return Math.abs(this.mag() - pos.mag());
  }
  rotate = (angle: number) => {

  }
}