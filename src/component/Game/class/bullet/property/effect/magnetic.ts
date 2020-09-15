import { Players } from "../../../player";
import { Vector } from "../../../base";

export const magnetic = (target: any): Function => {
  return class extends target {
    protected hasEffect = true;
    private force = 10;
    applyEffect = (objects: Players) => {
      objects.getList.forEach(d => {
        const target = d.pos;
        const temp = new Vector(this.pos.x, this.pos.y);
        temp.sub(target)
        const len = temp.mag();
        if (len < 500) {
          temp.mult(this.force)
          temp.div(len)
          d.setA = temp;
        }
      })
    }
  }
}