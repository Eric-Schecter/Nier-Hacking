import { Vector } from '../../../Base';

export const direct = (target: any): Function => {
  return class extends target {
    private mag = 30;
    update = () => {
      this.v = new Vector(this.mag * Math.sin(this.radian), -this.mag * Math.cos(this.radian))
      this.pos.add(this.v);
    }
  }
}