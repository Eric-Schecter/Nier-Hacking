import { Vector } from '../../../base';
import { BulletEnemy } from '../../../bullet';
import { type, effect,moveMode ,explodeEffect} from '../../../bullet/property';

@type('laser')
@explodeEffect('normal')
class BulletEnemyLaser extends BulletEnemy { }

export const laser = (target: any): Function => {
  return class extends target {
    protected fire = (pos: Vector) => {
      if (this.count % this.fireSpeed === 0) {
        this.bullet.add(new BulletEnemyLaser(this.ctx, new Vector(this.pos.x, this.pos.y), new Vector(pos.x, pos.y), this.explodeEffects, this.audio))
      }
      this.count++;
    }
  }
}