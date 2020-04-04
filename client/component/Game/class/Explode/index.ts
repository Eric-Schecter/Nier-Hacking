import { Vector, System } from '../Base';
import { Shape, Wave, Particle, BubbleLine, Ray, WaveRed, Line, Field } from './property';

abstract class EffectSystem extends System {
  display = () => {
    this.list.forEach((d, i) =>
      d.isDead() ? this.remove(i) : d.display()
    )
  }
}

const effect = (type: any, count = 1) => {
  return (target: any): any => {
    return class extends target {
      add = (pos: Vector) => {
        new Array(count).fill(0).forEach(() => this.list.push(new type(this.ctx, pos)));
      }
    }
  }
}
@effect(Shape)
class ShapeSystem extends EffectSystem { }

@effect(WaveRed)
class WaveRedSystem extends EffectSystem { }

@effect(Wave)
class WaveSystem extends EffectSystem { }

@effect(Particle, 100)
class ParticleSystem extends EffectSystem { }

@effect(Line, 300)
class LineSystem extends EffectSystem { }

@effect(BubbleLine)
class BubbleLineSystem extends EffectSystem { }

@effect(Ray)
class RaySystem extends EffectSystem { }

@effect(Field)
class FieldSystem extends EffectSystem { }

abstract class Receipt {
  protected list: Array<any> = [];
  constructor(protected ctx: CanvasRenderingContext2D) { }
  add = (pos: Vector, color: [number, number, number]) => {
    this.list.forEach(d => d.add(pos, color));
  }
  display = () => {
    this.list.forEach(d => d.display());
  }
}

const add = (sys: any) => {
  return (target: any): any => {
    return class extends target {
      constructor(...args:Array<any>) {
        super(...args);
        this.add(new sys(this.ctx))
      }
    }
  }
}

@add(ParticleSystem)
@add(WaveSystem)
@add(ShapeSystem)
export class ExplodeEffect extends Receipt { }

@add(ParticleSystem)
@add(WaveRedSystem)
@add(LineSystem)
@add(RaySystem)
export class ExplodeEffectPlayer extends Receipt { }

@add(BubbleLineSystem)
export class ExplodeEffectBullet extends Receipt { }

@add(FieldSystem)
export class ExplodeEffectBulletField extends Receipt { }
