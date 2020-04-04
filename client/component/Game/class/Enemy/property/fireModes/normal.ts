import { Vector } from '../../../Base';
import { BulletEnemy } from '../../../Bullet';
import { type } from '../../../Bullet/property';

@type('ball')
class BulletEnemyNormal extends BulletEnemy { }

export const normal = (target: any): Function => {
  return class extends target {
    protected fire = (pos: Vector) => {
      if (this.count % this.fireSpeed === 0) {
        this.bullet.add(new BulletEnemyNormal(this.ctx, new Vector(this.pos.x, this.pos.y), new Vector(pos.x, pos.y), this.explodeEffectBullet, this.audio))
      }
      this.count++;
    }
  }
}