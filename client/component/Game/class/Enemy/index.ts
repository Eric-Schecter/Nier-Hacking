import { Vector, MoveUnit, System } from '../Base';
import { ExplodeEffect, ExplodeEffectBullet } from '../explode';
import { Bullets } from '../Bullet';
import { Floor } from '../Field';
import { ProtectionField } from './property/states/protection'
import { sounds } from '../../../../sounds';
const { explodeEnemy, hitEnemy, hitShield } = sounds;

export class Enemy extends MoveUnit {
  protected radius = 50;
  protected speed = 3;
  protected opacity = 1;
  private timer: any;
  protected life = 10;
  protected isProtected = false;
  protected soundDead = explodeEnemy.src;
  protected soundHit = hitEnemy.src;
  protected count = 0;
  protected width = this.isProtected ? 200 : 100;
  protected height = this.isProtected ? 200 : 100;
  protected fireSpeed = 100;
  protected protection = new ProtectionField(this.ctx, this.pos, this.angle);

  constructor(ctx: CanvasRenderingContext2D, pos: Vector, angle: number,
    explodeEffect: ExplodeEffect, protected bullet: Bullets, protected explodeEffectBullet: ExplodeEffectBullet, protected audio: any) {
    super(ctx, pos, angle, explodeEffect);
  }
  get getProtection() {
    return this.protection;
  }
  get getIsProtected() {
    return this.isProtected;
  }
  set setIsProtected(status: boolean) {
    this.soundHit = status
      ? hitEnemy.src
      : hitShield.src
    this.isProtected = status;
  }

  protected hitEffect = () => {
    this.audio.play(this.soundHit, 0.5)
    if (this.isProtected) { return; }

    this.opacity = 0.3;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.opacity = 1;
    }, 1000 / 60);
  }
  protected move = (pos: Vector, area: Floor) => { };
  protected fire = (pos: Vector) => { }
  update = (pos: Vector, area: Floor) => {
    this.move(pos, area);
    this.fire(pos);
  }

  display = () => {
    this.draw();
    this.isProtected && this.protection.display(this.pos);
  }
}

export class Enemys extends System {
  protected list: Array<Enemy> = [];
  private checkDead = () => {
    this.list.forEach((enemy, i) => {
      if (enemy.isDead()) {
        enemy.explode();
        this.remove(i);
      }
      enemy.display();
    })
  }
  private checkProtection = () => {
    const protectedEnemys = this.list.filter(d => d.getIsProtected);
    const noprotectedEnemys = this.list.filter(d => !d.getIsProtected);
    if (noprotectedEnemys.length === 0 && protectedEnemys.length !== 0) {
      protectedEnemys.forEach(d => {
        if (!d.getProtection.getIsFade) {
          d.getProtection.setIsFade = true;
          setTimeout(() => {
            d.setIsProtected = false;
          }, 700);
        }
      })
    }
  }
  update = () => {
    this.checkDead();
    this.checkProtection();
  }
}