import { Normal } from './normal';
import { Slow } from './slow';
import { Confuse } from './confuse';
import { Shokcwave } from './shokcwave';

type Mode = 'normal' | 'slow' | 'confuse' | 'shokcwave';

const factory = (ExplodeEffect:any) => {
  return (target: any) => {
    return class extends target {
      protected explodeEffect = () => {
        const effect = new ExplodeEffect(this.ctx,this.audio);
        effect.add(this.pos, this.color);
        this.explodeEffects.add(effect)
      }
    }
  }
}

export const explodeEffect = (mode: Mode) => {
  switch (mode) {
    case 'normal': return factory(Normal);
    case 'slow': return factory(Slow);
    case 'confuse': return factory(Confuse);
    case 'shokcwave': return factory(Shokcwave);
    default: return (a: any) => a;
  }
}