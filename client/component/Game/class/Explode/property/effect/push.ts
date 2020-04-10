import { Players } from "../../../player";
import { Vector } from "../../../base";

export const push = (target: any): Function => {
  return class extends target {
    protected hasEffect = true;
    applyEffect = (objects: Players) => {
      objects.getList.forEach(d => {
        const target = new Vector(d.pos.x, d.pos.y);
        this.getList.forEach((sd: any) => {
          target.sub(sd.pos)
          const len = target.mag();
          if (len < 500) {
            target.div(10);
            d.setA = target;
          }
        })
      })
    }
  }
}