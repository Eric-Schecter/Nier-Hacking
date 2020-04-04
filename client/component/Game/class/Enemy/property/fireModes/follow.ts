import { Vector } from '../../../Base';
import { BulletEnemy } from '../../../Bullet';
import { type,moveMode } from '../../../Bullet/property';

@type('arrow')
@moveMode('follow')
class BulletEnemyFollow extends BulletEnemy { }

export const follow = (target: any): Function => {
  return class extends target {
    protected fire = (pos: Vector) => {
      if (this.count % this.fireSpeed === 0) {
        this.bullet.add(new BulletEnemyFollow(this.ctx, new Vector(this.pos.x, this.pos.y), new Vector(pos.x, pos.y), this.explodeEffectBullet, this.audio))
      }
      this.count++;
    }
  }
}