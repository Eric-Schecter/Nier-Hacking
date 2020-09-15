import { Vector, MoveUnit, System } from '../base';
import { Explodes } from '../explode';
import { Bullets } from '../bullet';
import { Floor } from '../field';
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
  private a = new Vector(0, 0);
  protected gravity = 10;
  private gravityIndex = 500;

  constructor(ctx: CanvasRenderingContext2D, pos: Vector, angle: number,
    explodeEffect: Explodes, protected bullet: Bullets, protected audio: any) {
    super(ctx, pos, angle,explodeEffect);
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

  get getA() {
    return this.a;
  }
  set setA(v: Vector) {
    this.a = v;
  }

  protected applyRepulision = (enemys: Array<Enemy>) => {
    const aArr = enemys.map(d => {
      if (!d.pos || !this.pos || this.pos.isEqual(d.pos)) { return new Vector(0, 0) }
      const temp = new Vector(this.pos.x, this.pos.y);
      temp.sub(d.pos);
      if (temp.mag() > 150) { return new Vector(0, 0) }
      temp.div(temp.mag() * temp.mag() * this.gravity);
      temp.mult(this.gravityIndex);
      return temp;
    })
    const a = aArr.reduce((a, b) => {
      const temp = new Vector(a.x, a.y);
      temp.add(b);
      return temp
    }, this.a);
    this.setA = a;
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
  protected explodeEffect = () => { }
  protected move = (pos: Vector, area: Floor) => { };
  protected fire = (pos: Vector) => { }
  update = (pos: Vector, area: Floor, enemys: Array<Enemy>) => {
    this.applyRepulision(enemys);
    this.move(pos, area);
    this.fire(pos);
    this.setA = new Vector(0, 0);
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