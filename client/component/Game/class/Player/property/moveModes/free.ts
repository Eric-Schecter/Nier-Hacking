import { Vector } from '../../../Base';
import { Floor } from '../../../Field';

export const free = (target: any):Function => {
  return class extends target {
    private angleRatio = 3;
    protected move = (v: Vector, angle: number, area: Floor) => {
      const { xBorder, yBorder } = this.borderCheck(v, area);
      if (xBorder) { v.x = 0; }
      if (yBorder) { v.y = 0; }
      v.normalize();
      v.mult(this.step);
      this.pos.add(v);
      this.radian += angle / 180 * Math.PI * this.angleRatio;
      this.angle += angle * this.angleRatio;
    }
  }
}

