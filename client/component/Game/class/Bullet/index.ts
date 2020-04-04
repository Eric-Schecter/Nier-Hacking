import { Vector, FireUnit, System } from '../Base';
import { Enemy, Enemys } from '../Enemy';
import { Player, Players } from '../Player';
import { Floor } from '../Field';
import { ExplodeEffectBullet, ExplodeEffectBulletField } from '../explode';
import { sounds } from '../../../../sounds';
const { shootEnemy, shootPlayer } = sounds;

export class BulletPlayer extends FireUnit {
  protected yTop = 80;
  protected yBottom = 0;
  protected xLeft = 15;
  protected xRight = 15;
  // protected width = 30;
  // protected height = 100;
  protected sound = shootPlayer.src;
}

export class BulletEnemy extends FireUnit {
  private speed = 15;
  protected sound = shootEnemy.src;
  protected color: [number, number, number] = [233, 121, 55];
  constructor(public ctx: CanvasRenderingContext2D, public pos: Vector, private posTarget: Vector,
    private explodeEffect: ExplodeEffectBullet | ExplodeEffectBulletField, audio: any) {
    super(ctx, pos, 0, audio);
    this.setup();
  }
  protected setup = () => {
    this.v = new Vector(this.posTarget.x, this.posTarget.y)
    this.v.sub(this.pos);
    this.v.normalize();
    this.v.mult(this.speed);
  }
  explode = () => {
    this.explodeEffect.add(this.pos, this.color);
  }
  draw = () =>{}
  display = () => {
    this.fire();
    this.pos.add(this.v);
    this.draw();
  }
}

export class Bullets extends System {
  constructor(protected ctx: CanvasRenderingContext2D) {
    super();
   }
  update = (objectArr: Array<Enemys | Players | Bullets>, area: Floor) => {
    const objects: Array<Array<BulletEnemy | BulletPlayer | Enemy | Player>> = objectArr.map(d => d.getList);
    for (let i = this.list.length - 1; i >= 0; i--) {
      this.list[i].display();
      const { xBorder, yBorder } = this.list[i].borderCheck(this.list[i].getV, area);
      const collisionCheck = () => {
        for (let j = 0; j < objects.length; j++) {
          for (let k = 0; k < objects[j].length; k++) {
            if (this.list[i].collisionCheck(objects[j][k])) {
              return { selfResult: this.list[i].getCanDefect, targetResult: objects[j][k].getCanDefect, m: j, n: k };
            }
          }
        }
        return { selfResult: false, targetResult: false, m: -1, n: -1 };
      }
      const { selfResult, targetResult, m, n } = collisionCheck();
      if (targetResult) {
        const hitedTarget = objects[m][n];
        if (hitedTarget instanceof BulletPlayer || hitedTarget instanceof BulletEnemy) {
          if (selfResult) {
            hitedTarget.hit();
            if (hitedTarget.getLife <= 0) {
              hitedTarget.explode();
              objectArr[m].remove(n);
            }
          }
        } else {
          hitedTarget.hit();
        }
      }

      if (selfResult) {
        this.list[i].hit();
      }

      const life = this.list[i].getLife;
      if (life <= 0) {
        this.list[i].explode();
      }
      if (xBorder || yBorder || life <= 0) {
        this.remove(i);
      }
    }
  }
}
