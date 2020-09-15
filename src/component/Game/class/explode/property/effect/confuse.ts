import { Players } from "../../../player";
import { Vector } from "../../../base";

export const confuse = (target: any): Function => {
  return class extends target {
    protected hasEffect = true;
    private count = 0;
    applyEffect = (objects: Players) => {
      objects.getList.forEach(d => {
        const target = d.pos;
        this.getList.forEach((sd: any) => {
          const temp = new Vector(sd.pos.x, sd.pos.y);
          temp.sub(target)
          const len = temp.mag();
          if(Math.floor(this.count / 10) % 5 < 1){
            const soundEffect = sd.getSoundEffect;
            soundEffect && this.audio.play(soundEffect);
            if (len < 500) {
              d.setVIndex = -1;
            }
          }
        })
      })
      this.count++;
    }
  }
}