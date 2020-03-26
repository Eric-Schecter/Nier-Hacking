import { Unit, MoveUnit, MoveUnits } from './Unit';
import { Vector } from './Vector';
import { ExplodeEffect, ExplodeEffectBullet } from './explode';
import { Bullets, BulletEnemy } from './Bullet';

class ProtectionField extends Unit {
  private radius = 0;
  private opacity = 0.5;
  private isFade = false;

  private drawCircle = (radius: number) => {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, radius, 0, Math.PI * 2, false);
    this.ctx.stroke();
    this.ctx.restore();
  }
  get getIsFade() {
    return this.isFade;
  }
  set setIsFade(status: boolean) {
    this.isFade = status;
  }

  display = () => {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = 'white';
    this.ctx.lineWidth = 5;
    this.drawCircle(this.radius);
    this.drawCircle(this.radius + 25);
    this.drawCircle(this.radius + 50);
    this.drawCircle(this.radius + 75);
    this.ctx.restore();
  }
  update = (pos: Vector) => {
    this.radius >= 25
      ? this.radius = 0
      : this.radius += 0.8;
    this.pos = pos;
    if (this.isFade) {
      this.opacity -= 0.01;
    }
  }
}

export class Enemy extends MoveUnit {
  private radius = 50;
  private speed = 3;
  private opacity = 1;
  private timer: any;
  protected life = 10;
  private protection: ProtectionField = new ProtectionField(this.ctx, this.pos, this.angle);
  protected isProtected = false;
  protected soundDead = '/media/enemy_explode0.wav';
  protected soundHit = this.isProtected ? '/media/core_hit_shield.wav' : '/media/enemy_hit.wav';
  private bullet: Bullets;
  private count = 0;
  protected width = this.isProtected ? 200 : 100;
  protected height = this.isProtected ? 200 : 100;
  private explodeEffectBullet:ExplodeEffectBullet;

  constructor(ctx: CanvasRenderingContext2D, pos: Vector, angle: number, 
    explodeEffect: ExplodeEffect, bulletsEnemy: Bullets,explodeEffectBullet:ExplodeEffectBullet ) {
    super(ctx, pos, angle, explodeEffect);
    this.bullet = bulletsEnemy;
    this.explodeEffectBullet = explodeEffectBullet;
  }
  set setIsProtected(status: boolean) {
    this.soundHit = status
      ? '/media/core_hit_shield.wav'
      : '/media/enemy_hit.wav'
    this.isProtected = status;
  }

  protected hitEffect = () => {
    new Audio(this.soundHit).play();
    if (this.isProtected) { return; }

    this.opacity = 0.3;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.opacity = 1;
    }, 1000 / 60);
  }

  update = (pos: Vector) => {
    const v = new Vector(pos.x, pos.y)
    v.sub(this.pos);
    v.normalize();
    v.mult(this.speed);
    this.pos.add(v);
    this.fire(pos)
  }
  private draw = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(94,90,86,${this.opacity})`;
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.isProtected && this.protection.update(this.pos);
  }
  private fire = (pos: Vector) => {
    if (this.count % 100 === 0) {
      this.bullet.add(new BulletEnemy(this.ctx, new Vector(this.pos.x, this.pos.y), new Vector(pos.x, pos.y),this.explodeEffectBullet))
    }
    this.count++;
  }
  display = (objects: Bullets, enemys: Enemys) => {
    this.hitCheck(objects.getList);
    this.draw();
    if (this.isProtected && enemys.list.length === 1 && !this.protection.getIsFade) {
      this.protection.setIsFade = true;
      setTimeout(() => {
        this.isProtected = false;
      }, 700);
    } else if (this.isProtected) {
      this.protection.display();
    }
  }
}

const protectionMode = (target: any) => {
  return class extends Enemy {
    constructor(...args: [CanvasRenderingContext2D, Vector, number, ExplodeEffect, Bullets,ExplodeEffectBullet]) {
      super(...args);
      this.setIsProtected = true;
    }
  }
}

@protectionMode
export class ProtectedEmeny extends Enemy { }

export class Enemys extends MoveUnits {
  list: Array<Enemy> = [];
  display = (bullets: Bullets, enemys: Enemys) => {
    this.list.forEach((enemy, i) => {
      if (enemy.isDead()) {
        enemy.explode();
        this.remove(i);
      }
      enemy.display(bullets, enemys);
    })
  }
}