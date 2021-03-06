import { Effect,add,ParticleSystem,WaveRedSystem,LineSystem,RaySystem} from '../../../explode'

@add(ParticleSystem)
@add(WaveRedSystem)
@add(LineSystem)
@add(RaySystem)
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