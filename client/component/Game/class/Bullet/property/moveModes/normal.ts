import { Vector } from '../../../base';

export const normal = (target: any): Function => {
  return class extends target {
    constructor(...args: Array<any>) {
      super(...args);
      this.setup();
    }
    protected setup = () => {
      this.v = new Vector(this.posTarget.x, this.posTarget.y)
      this.v.sub(this.pos);
      this.v.normalize();
      this.v.mult(this.speed);
    }
    update = () => {
      this.pos.add(this.v);
    }
  }
}