import { Vector, System } from '../base';
import { type } from './property';
import { Players } from '../player';

export abstract class SystemE extends System {
  protected list: Array<any> = [];
  protected hasEffect = false;
  constructor(protected ctx: CanvasRenderingContext2D,protected audio?: any) {
    super();
  }
  applyEffect = (objects: Players) => { }
  display = (objects: Players) => {
    this.list.forEach((d, i) => {
      this.hasEffect && this.applyEffect(objects);
      d.isDead() ? this.remove(i) : d.display()
    })
  }
}

export const sys = (type: any, count = 1) => {
  return (target: any): any => {
    return class extends target {
      constructor(protected ctx: CanvasRenderingContext2D,protected audio?: any) {
        super();
      }
      add = (pos: Vector, color: [number, number, number]) => {
        new Array(count).fill(0).forEach((d, i) => this.list.push(new type(this.ctx, pos, color, i)));
      }
    }
  }
}

export abstract class Effect {
  protected list: Array<any> = [];
  constructor(protected ctx: CanvasRenderingContext2D, protected audio?: any) { }
  add = (pos: Vector, color?: [number, number, number]) => {
    this.list.forEach(d => d.add(pos, color));
  }
  display = (objects: Players) => {
    this.list.forEach(d => d.display(objects));
  }
}

export const add = (sys: any) => {
  return (target: any): any => {
    return class extends target {
      constructor(protected ctx: CanvasRenderingContext2D,protected audio?: any) {
        super(ctx,audio);
        this.list.push(new sys(ctx,audio))
      }
    }
  }
}

// @add(FieldSystem)
// export class ExplodeEffectBulletField extends Effect {}

export class Explodes extends System {
  protected list: Array<SystemE> = [];
  constructor(protected ctx: CanvasRenderingContext2D) {
    super();
  }
  display = (objects: Players) => {
    this.list.forEach((d, i) => {
      d.display(objects);
    });
  }
}

@sys(type('waveRed'))
export class WaveRedSystem extends SystemE { }

@sys(type('wave'))
export class WaveSystem extends SystemE { }

@sys(type('bubbleLine'))
export class BubbleLineSystem extends SystemE { }

@sys(type('ray'))
export class RaySystem extends SystemE { }

@sys(type('shape'))
export class ShapeSystem extends SystemE { }

@sys(type('particle'), 100)
export class ParticleSystem extends SystemE { }

@sys(type('line'), 300)
export class LineSystem extends SystemE { }

