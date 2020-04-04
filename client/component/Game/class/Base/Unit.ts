import { Vector } from './Vector';
import { Floor } from '../Field';
import { ExplodeEffect, ExplodeEffectPlayer } from '../Explode';
import { AudioRef } from '../../../../hooks/useAudio';

interface Check {
  borderCheck: (v: Vector, area: Floor) => { xBorder: boolean, yBorder: boolean };
  collisionCheck: (object: { pos: Vector, getSize: { width: number, height: number } }) => boolean;
}

export abstract class Unit implements Check {
  protected radian = this.angle / 180 * Math.PI;
  protected yTop = 80;
  protected yBottom = 40;
  protected xLeft = 30;
  protected xRight = 30;
  protected canDefect = true;
  constructor(public ctx: CanvasRenderingContext2D, public pos: Vector, public angle: number = 0) { }
  get getSize() {
    return {
      width: this.xLeft + this.xRight,
      height: this.yTop + this.yBottom,
    }
  }
  get getCanDefect() {
    return this.canDefect;
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
    return Math.abs(this.pos.x - object.pos.x) < Math.max(width / 2, object.getSize.width / 2)
      && Math.abs(this.pos.y - object.pos.y) < Math.max(height / 2, object.getSize.height / 2)
  }
}

export abstract class FireUnit extends Unit {
  private isFire = false;
  protected sound = '';
  protected v = new Vector(0, 0);
  protected life = 1;
  protected soundHit = '';
  constructor(ctx: CanvasRenderingContext2D, pos: Vector, angle: number, protected audio: AudioRef) {
    super(ctx, pos, angle);
  }
  get getLife() {
    return this.life;
  }
  get getV() {
    return this.v;
  }
  private hitEffect = () => {

  }
  hit = () => {
    this.soundHit && this.audio.play(this.soundHit);
    this.life--;
    this.life > 0 && this.hitEffect();
  }
  protected fire = () => {
    if (!this.isFire) {
      if (this.sound && this.audio) {
        this.audio.play(this.sound, 0.5);
      }
      this.isFire = true;
    }
  }
  protected update = (pos?: Vector) => { }
  explode = () => { }
}

export abstract class MoveUnit extends Unit {
  protected life = 0;
  protected soundDead = '';
  protected explodeEffect: ExplodeEffect | ExplodeEffectPlayer;
  protected isProtected = false;
  protected damagePeriod = false;
  protected damagePeriodTime = 100;
  protected audio: any;
  protected color: [number, number, number] = [0, 0, 0];
  constructor(ctx: CanvasRenderingContext2D, pos: Vector, angle: number, explodeEffect: ExplodeEffect | ExplodeEffectPlayer) {
    super(ctx, pos, angle);
    this.explodeEffect = explodeEffect;
  }
  isDead = () => {
    return this.life <= 0;
  }
  explode = () => {
    this.audio.play(this.soundDead);
    this.explodeEffect.add(this.pos, this.color);
  }
  protected invincibleMode = () => {
    this.damagePeriod = true;
    setTimeout(() => {
      this.damagePeriod = false;
    }, this.damagePeriodTime);
  }
  protected abstract hitEffect = () => { };
  hit = () => {
    if (this.damagePeriod) { return; }
    if (!this.isProtected) {
      this.life -= 1;
      this.invincibleMode();
    }
    this.hitEffect();
  }
  protected borderLimit = (v: Vector, area: Floor) => {
    const { xBorder, yBorder } = this.borderCheck(v, area);
    if (xBorder) { v.x = 0; }
    if (yBorder) { v.y = 0; }
  }
  protected draw = () => { }
}

export abstract class System {
  protected list: Array<any> = []
  get getList() {
    return this.list;
  }
  add = (d: any) => {
    this.list.push(d)
  }
  remove = (i: number) => {
    this.list.splice(i, 1);
  }
}