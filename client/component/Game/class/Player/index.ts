import { Vector, MoveUnit, System } from '../Base';
import { Bullets } from '../Bullet';
import { ExplodeEffectPlayer } from '../explode';
import { Enemys, Enemy } from '../Enemy';
import { Floor } from '../Field';
import { type, moveMode, fireMode } from './property';
import { sounds } from '../../../../sounds';
const { explodePlayer, hitPlayer } = sounds;

abstract class PlayerAbs extends MoveUnit {
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
  // private a = new Vector(0, 0);

  constructor(ctx: CanvasRenderingContext2D, pos: Vector, angle: number, explodeEffect: ExplodeEffectPlayer, private bullets: Bullets, protected audio: any) {
    super(ctx, pos, angle, explodeEffect);
  }

  explode = () => {
    this.audio.play(this.soundDead);
    this.explodeEffect.add(this.pos, this.color);
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
  display = (objects: Enemys, v: Vector, angle: number, area: Floor) => {
    this.hitCheck(objects.getList);
    this.move(v, angle, area);
    this.draw();
  }
  fire = () => { }
  protected draw = () => { }
  protected move = (v: Vector, angle: number, area: Floor) => { }
}

@type('plane')
@moveMode('free')
@fireMode('normal')
export class Player extends PlayerAbs { }

export class Players extends System {
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