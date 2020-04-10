import { Vector } from '../../../base';

export const follow = (target: any): Function => {
  return class extends target {
    private speed = 5;
    private count = 0;
    update = (pos: Vector) => {
      if(!pos){return}
      this.v = new Vector(pos.x, pos.y)
      this.v.sub(this.pos);
      this.v.normalize();
      this.v.mult(this.speed);
      const v = new Vector(Math.cos(this.radian), Math.sin(this.radian));
      this.radian += (v.getRadius(this.v) - Math.PI / 2) / 10;
      this.pos.add(this.v);
      this.count++;
      if (this.count > 180) {
        this.speed += 0.5;
      }
    }
  }
}