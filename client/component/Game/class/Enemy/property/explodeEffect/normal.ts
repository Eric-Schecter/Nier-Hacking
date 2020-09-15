import { Effect, add, ParticleSystem, WaveSystem, ShapeSystem, Explodes } from '../../../explode';

@add(ParticleSystem)
@add(WaveSystem)
@add(ShapeSystem)
class ExplodeEffect extends Effect { };

export const normal = (target: any): Function => {
  return class extends target {
    protected explodeEffect = () => {
      const effect = new ExplodeEffect(this.ctx);
      effect.add(this.pos);
      this.explodeEffects.add(effect)
    }
  }
}