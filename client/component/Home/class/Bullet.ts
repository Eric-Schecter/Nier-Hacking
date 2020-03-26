import { Vector } from './Vector';
import { FireUnit } from './Unit';
import { Enemy } from './Enemy';
import { Player } from './Player';
import { Floor } from './Floor';
import { ExplodeEffectBullet } from './explode';

export class BulletPlayer extends FireUnit {
  protected yTop = 80;
  protected yBottom = 0;
  protected xLeft = 15;
  protected xRight = 15;
  // protected width = 30;
  // protected height = 100;

  private mag = 30;
  private v = new Vector(0, 0);
  protected sound = '/media/player_shoot.wav';
  get getV() {
    return this.v;
  }
  private update = () => {
    this.v = new Vector(this.mag * Math.sin(this.radian), -this.mag * Math.cos(this.radian))
    this.pos.add(this.v);
  }
  display = () => {
    const { width, height } = this.getSize;
    this.update();
    this.fire();
    this.ctx.save();
    // this.ctx.moveTo(this.pos.x, this.pos.y);
    this.rotate();
    this.ctx.beginPath();
    this.ctx.fillStyle = 'whitesmoke';
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = 'whitesmoke';
    this.ctx.rect(this.pos.x - width / 2, this.pos.y - this.yTop, width, height);
    this.ctx.fill();
    this.ctx.restore();
  }
}

export class BulletEnemy extends FireUnit {
  private speed: number = 15;
  private v: Vector = new Vector(0, 0);
  protected sound = '/media/enemy_shoot.wav';
  private explodeEffect: ExplodeEffectBullet;
  constructor(public ctx: CanvasRenderingContext2D, public pos: Vector, private posTarget: Vector, explodeEffect: ExplodeEffectBullet) {
    super(ctx, pos);
    this.setup();
    this.explodeEffect = explodeEffect;
  }
  get getV() {
    return this.v;
  }
  setup = () => {
    this.v = new Vector(this.posTarget.x, this.posTarget.y)
    this.v.sub(this.pos);
    this.v.normalize();
    this.v.mult(this.speed);
  }
  private move = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgb(233,121,55)';
    this.ctx.arc(this.pos.x, this.pos.y, 50, 0, Math.PI * 2, false);
    this.ctx.fill();
  }
  explode = () => {
    this.explodeEffect.add(this.pos);
  }
  display = () => {
    this.fire();
    this.pos.add(this.v);
    this.move();
  }
}

export class Bullets {
  private list: Array<BulletPlayer | BulletEnemy> = [];
  constructor(protected ctx: CanvasRenderingContext2D) { }
  get getList() {
    return this.list;
  }
  add = (bullet: BulletEnemy | BulletPlayer) => {
    this.list.push(bullet);
  }
  remove = (i: number) => {
    this.list.splice(i, 1);
  }
  update = (objects: Array<Enemy | Player | BulletEnemy | BulletPlayer>, area: Floor) => {
    for (let i = this.list.length - 1; i >= 0; i--) {
      this.list[i].display();
      const { xBorder, yBorder } = this.list[i].borderCheck(this.list[i].getV, area);
      const collisionCheck = objects.some(object => this.list[i].collisionCheck(object))
      if (collisionCheck) {
        this.list[i].explode();
      }
      if (xBorder || yBorder || collisionCheck) {
        this.remove(i);
      }
    }
  }
}