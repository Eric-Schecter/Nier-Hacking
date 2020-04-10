import { Vector } from '../../../base';
import { Floor } from '../../../field';

export const circle = (target: any) :Function=> {
  return class extends target {
    protected move = (pos: Vector,area:Floor) => {
      const v = new Vector(Math.cos(this.count / 180 * Math.PI), Math.sin(this.count / 180 * Math.PI))
      this.borderLimit(v, area)
      v.normalize();
      v.mult(this.speed * 4);
      this.pos.add(v);
    }
  }
}
