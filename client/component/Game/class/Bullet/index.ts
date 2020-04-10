import { Vector, FireUnit, System } from '../base';
import { Enemy, Enemys } from '../enemy';
import { Player, Players } from '../player';
import { Floor } from '../field';
import { Explodes} from '../explode';
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
  display = () => { }
}

export class BulletEnemy extends FireUnit {
  protected speed = 8;
  protected sound = shootEnemy.src;
  protected soundExplode = '';
  protected color: [number, number, number] = [233, 121, 55];
  protected volume = 0.2;
  constructor(public ctx: CanvasRenderingContext2D, public pos: Vector, private posTarget: Vector,
    protected explodeEffects: Explodes, audio: any) {
    super(ctx, pos, 0, audio);
  }
  protected explodeEffect = () =>{}
  explode = () => {
    this.soundExplode && this.audio.play(this.soundExplode)
    this.explodeEffect();
  }
  draw = () => { }
  display = () => {
    this.fire();
    this.update();
    this.draw();
  }
}

export class Bullets extends System {
  protected list: Array<BulletEnemy> | Array<BulletPlayer> = [];
  constructor(protected ctx: CanvasRenderingContext2D) {
    super();
  }
  private collisionCheck = (objects: Array<Array<BulletEnemy | BulletPlayer | Enemy | Player>>, i: number) => {
    for (let j = 0; j < objects.length; j++) {
      for (let k = 0; k < objects[j].length; k++) {
        if (this.list[i].collisionCheck(objects[j][k])) {
          return { selfResult: this.list[i].getCanDefect, targetResult: objects[j][k].getCanDefect, m: j, n: k };
        }
      }
    }
    return { selfResult: false, targetResult: false, m: -1, n: -1 };
  }
  update = (objectArr: Array<Enemys | Players | Bullets>, area: Floor) => {
    const objects: Array<Array<BulletEnemy | BulletPlayer | Enemy | Player>> = objectArr.map(d => d.getList);
    for (let i = this.list.length - 1; i >= 0; i--) {
      this.list[i].display();
      this.list[i].getHasEffect && objectArr.forEach(d => d instanceof Players && this.list[i].applyEffect(d))

      const { selfResult, targetResult, m, n } = this.collisionCheck(objects, i);

      if (targetResult && selfResult) {
        const hitedTarget = objects[m][n];
        hitedTarget.hit();
        this.list[i].hit();
        if ((hitedTarget instanceof BulletPlayer || hitedTarget instanceof BulletEnemy) && hitedTarget.getLife <= 0) {
          hitedTarget.explode();
          objectArr[m].remove(n);
        }
      } else if (targetResult || selfResult) {
        const hitedTarget = objects[m][n];
        if (hitedTarget instanceof Player || hitedTarget instanceof Enemy) {
          targetResult && hitedTarget.hit();
          this.list[i].hit();
        }
      }

      // if (targetResult) {
      //   const hitedTarget = objects[m][n];
      //   if (hitedTarget instanceof BulletPlayer || hitedTarget instanceof BulletEnemy) {
      //     if (selfResult) {
      //       hitedTarget.hit();
      //       if (hitedTarget.getLife <= 0) {
      //         hitedTarget.explode();
      //         objectArr[m].remove(n);
      //       }
      //     }
      //   } else {
      //     hitedTarget.hit();
      //   }
      // }

      // if (selfResult) {
      //   this.list[i].hit();
      // }

      const life = this.list[i].getLife;
      if (life <= 0) {
        this.list[i].explode();
      }
      const { xBorder, yBorder } = this.list[i].borderCheck(this.list[i].getV, area);
      if (xBorder || yBorder || life <= 0) {
        this.remove(i);
      }
    }
  }
}
