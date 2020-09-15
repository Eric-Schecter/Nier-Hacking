import { Vector } from '../../../base';

export const target = (target: any): Function => {
  return class extends target {
    update = () => {
      this.v = new Vector(this.posTarget.x, this.posTarget.y)
      this.v.sub(this.pos);
      this.v.normalize();
      this.v.mult(this.speed);
      this.pos.add(this.v);
      if (this.pos.dis(this.posTarget) <= 10) {
        this.life = 0;
      }
    }
  }
}