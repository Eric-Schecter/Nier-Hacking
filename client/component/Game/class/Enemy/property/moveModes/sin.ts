import { Vector } from '../../../base';
import { Floor } from '../../../field';

export const sin = (target: any):Function => {
  return class extends target {
    protected move = (pos: Vector,area:Floor) => {
      const v = new Vector(Math.cos(this.count / 180 * Math.PI ) , 0)
      this.borderLimit(v, area)
      v.mult(this.speed * 6);
      this.pos.add(v);
    }
  }
}

