import { Vector } from './Vector';
import { Floor } from './Floor';
import { Enemy } from './Enemy';
import { Player } from './Player';
import { ExplodeEffect, ExplodeEffectPlayer } from './Explode';

export abstract class Unit {
  protected radian = this.angle / 180 * Math.PI;
  protected yTop = 80;
  protected yBottom = 40;
  protected xLeft = 30;
  protected xRight = 30;
  constructor(public ctx: CanvasRenderingContext2D, public pos: Vector, public angle: number = 0) { }
  get getSize() {
    return {
      width: this.xLeft + this.xRight,
      height: this.yTop + this.yBottom,
    }
  }
  protected rotate = () => {
    this.ctx.translate(this.pos.x, this.pos.y);
    this.ctx.rotate(this.radian);
    this.ctx.translate(-this.pos.x, -this.pos.y);
  }
  borderCheck = (v: Vector, area: Floor) => {
    const { left, right, top, bottom } = area.getSize;
    return {
      xBorder: (this.pos.x - left <= this.xLeft && v.x < 0) || (this.pos.x - right >= -this.xRight && v.x > 0),
      yBorder: (this.pos.y - top <= this.yTop && v.y < 0) || (this.pos.y - bottom >= -this.yBottom && v.y > 0)
    };
  }
  collisionCheck = (object: { pos: Vector, getSize: { width: number, height: number } }) => {
    const { width, height } = this.getSize;
    return Math.abs(this.pos.x - object.pos.x) < width / 2 + object.getSize.width / 2
      && Math.abs(this.pos.y - object.pos.y) < height / 2 + object.getSize.height / 2
  }
}

export abstract class FireUnit extends Unit {
  private isFire = false;
  protected sound = '';
  protected fire = () => {
    if (!this.isFire) {
      if (this.sound) {
        const sound = new Audio(this.sound);
        sound.volume = 0.5;
        sound.play();
      }
      this.isFire = true;
    }
  }
  explode = () => { }
}

export abstract class MoveUnit extends Unit {
  protected life = 0;
  protected soundDead = '';
  protected explodeEffect: ExplodeEffect | ExplodeEffectPlayer;
  protected isProtected = false;
  protected damagePeriod = false;
  protected damagePeriodTime = 100;
  constructor(ctx: CanvasRenderingContext2D, pos: Vector, angle: number, explodeEffect: ExplodeEffect | ExplodeEffectPlayer) {
    super(ctx, pos, angle);
    this.explodeEffect = explodeEffect;
  }
  isDead = () => {
    return this.life <= 0;
  }
  explode = () => {
    new Audio(this.soundDead).play();
    this.explodeEffect.add(this.pos);
  }
  protected invincibleMode = () => {
    this.damagePeriod = true;
    setTimeout(() => {
      this.damagePeriod = false;
    }, this.damagePeriodTime);
  }
  protected abstract hitEffect = () => { };
  protected hitCheck = (objects: Array<{ pos: Vector, getSize: { width: number, height: number } }>) => {
    const { width, height } = this.getSize;
    objects.forEach(object => {
      if (Math.abs(this.pos.x - object.pos.x) < width / 2 + object.getSize.width / 2 + 20
        && Math.abs(this.pos.y - object.pos.y) < height / 2 + object.getSize.height / 2 + 20) {
        if (this.damagePeriod) { return; }
        if (!this.isProtected) {
          this.life -= 1;
          this.invincibleMode();
        }
        this.hitEffect();
      }
    })
  }
}

export abstract class MoveUnits {
  list: Array<any> = []
  add = (d: Enemy | Player) => {
    this.list.push(d);
  }
  remove = (i: number) => {
    this.list.splice(i, 1);
  }
}