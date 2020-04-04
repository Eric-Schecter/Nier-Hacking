import { Vector } from '../../../Base';
import { Floor } from '../../../Field';

export const follow = (target: any):Function => {
  return class extends target {
    protected move = (pos: Vector, area: Floor) => {
      const v = new Vector(pos.x, pos.y)
      this.borderLimit(v, area)
      v.sub(this.pos);
      v.normalize();
      v.mult(this.speed);
      const v1 = new Vector(Math.cos(this.radian), Math.sin(this.radian));
      this.radian += (v1.getRadius(v) - Math.PI / 2) / 10;
      this.pos.add(v);
    }
  }
}