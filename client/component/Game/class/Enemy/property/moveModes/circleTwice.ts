import { Vector } from '../../../base';
import { Floor } from '../../../field';

export const circleTwice = (target: any):Function => {
  return class extends target {
    protected move = (pos: Vector,area:Floor) => {
      const v = new Vector(Math.cos(this.count / 180 * Math.PI ) * 1.5 , -Math.cos(this.count / 180 * Math.PI * 2))
      this.borderLimit(v, area)
      v.mult(this.speed * 4);
      this.pos.add(v);
    }
  }
}