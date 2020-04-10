import { Players } from "../../../player";
import { Vector } from "../../../base";

export const slow = (target: any): Function => {
  return class extends target {
    protected hasEffect = true;
    applyEffect = (objects: Players) => {
      objects.getList.forEach(d => {
        const target = d.pos;
        this.getList.forEach((sd: any) => {
          const temp = new Vector(sd.pos.x, sd.pos.y);
          temp.sub(target)
          const len = temp.mag();
          if (len < 500) {
            d.setVIndex = 0.5;
          }
        })
      })
    }
  }
}