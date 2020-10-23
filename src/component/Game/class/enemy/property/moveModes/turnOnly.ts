import { Vector } from '../../../base';

export const turnOnly = (target: any) :Function=> {
  return class extends target {
    protected move = (pos: Vector) => {
      const v = new Vector(pos.x, pos.y)
      v.sub(this.pos);
      v.normalize();
      v.mult(this.speed);
      const v1 = new Vector(Math.cos(this.radian), Math.sin(this.radian));
      this.radian += (v1.getRadius(v) - Math.PI / 2) / 10;
    }
  }
}
