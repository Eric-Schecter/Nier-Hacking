import { Vector } from '../../../base';
import { Floor } from '../../../field';

export const rebound = (target: any):Function => {
  return class extends target {
    private v = new Vector(1, 1);
    private borderRebound = (v: Vector, area: Floor) => {
      const { xBorder, yBorder } = this.borderCheck(v, area);
      if (xBorder) { v.x = -v.x; }
      if (yBorder) { v.y = -v.y; }
    }
    protected move = (pos: Vector,area:Floor) => {
      this.borderRebound(this.v, area)
      this.v;
      this.v.normalize();
      this.v.mult(this.speed * 4);
      this.pos.add(this.v);
    }
  }
}