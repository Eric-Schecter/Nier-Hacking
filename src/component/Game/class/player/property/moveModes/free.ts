import { Floor } from '../../../field';

export const free = (target: any): Function => {
  return class extends target {
    private angleRatio = 3;
    protected move = (angle: number, area: Floor) => {
      this.v.mult(this.vIndex);
      this.v.add(this.a);
      const { xBorder, yBorder } = this.borderCheck(this.v, area);
      if (xBorder) { this.v.x = 0; }
      if (yBorder) { this.v.y = 0; }
      this.pos.add(this.v);
      this.radian += angle / 180 * Math.PI * this.angleRatio;
      this.angle += angle * this.angleRatio;
    }
  }
}

