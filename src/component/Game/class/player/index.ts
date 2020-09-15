import { Vector, MoveUnit, System } from '../base';
import { Bullets } from '../bullet';
import { Explodes } from '../explode';
import { Enemys, Enemy } from '../enemy';
import { Floor } from '../field';
import { sounds } from '../../../../sounds';
const { explodePlayer, hitPlayer } = sounds;

export abstract class Player extends MoveUnit {
  protected yTop = 80;
  protected yBottom = 40;
  protected xLeft = 30;
  protected xRight = 30;
  private step = 15;
  protected life = 3;
  protected soundDead = explodePlayer.src;
  protected soundHit = hitPlayer.src;
  protected damagePeriodTime = 1000;
  private hitWave = false;
  private hitWaveRadius = 0;
  protected color: [number, number, number] = [212, 209, 194];
  protected a = new Vector(0, 0);
  protected v = new Vector(0, 0);
  protected vIndex = 1;

  constructor(ctx: CanvasRenderingContext2D, pos: Vector, angle: number, explodeEffects: Explodes, private bullets: Bullets, protected audio: any) {
    super(ctx, pos, angle, explodeEffects);
  }
  get getV() {
    return this.v;
  }
  set setVIndex(i: number) {
    this.vIndex *= i;
  }
  get getA() {
    return this.a;
  }
  set setA(v: Vector) {
    this.a.add(v);
  }

  protected hitEffect = () => {
    if (this.hitWave) { return; }
    this.audio.play(this.soundHit, 0.5);
    this.hitWave = true;
    setTimeout(() => {
      this.hitWave = false;
      this.hitWaveRadius = 0;
    }, this.damagePeriodTime);
  }
  private hitCheck = (objects: Array<Enemy>) => {
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
  private update = (v: Vector) => {
    v.normalize();
    v.mult(this.step);
    this.v = v;
  }
  private init = () =>{
    this.a = new Vector(0, 0);
    this.vIndex = 1;
  }
  protected move = (angle: number, area: Floor) => { }
  display = (objects: Enemys, v: Vector, angle: number, area: Floor) => {
    this.hitCheck(objects.getList);
    this.update(v);
    this.move(angle, area);
    this.draw();
    this.init();
  }
  fire = () => { }
  protected explodeEffect = () => { }
  protected draw = () => { }
}

export class Players extends System {
  protected list: Array<Player> = [];
  update = (v: Vector, angle: number, enemys: Enemys, area: Floor) => {
    this.list.forEach((d, i) => {
      if (d.isDead()) {
        d.explode();
        this.remove(i)
      }
      d.display(enemys, v, angle, area)
    });
  }
}