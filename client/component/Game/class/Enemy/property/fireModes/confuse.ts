import { Vector } from '../../../base';
import { BulletEnemy } from '../../../bullet';
import { type,moveMode,explodeEffect } from '../../../bullet/property';

@type('lightningBall')
@moveMode('target')
@explodeEffect('confuse')
class BulletEnemyConf extends BulletEnemy { }

export const confuse = (target: any): Function => {
  return class extends target {
    protected fire = (pos: Vector) => {
      if (this.count % this.fireSpeed === 0) {
        this.bullet.add(new BulletEnemyConf(this.ctx, new Vector(this.pos.x, this.pos.y), new Vector(pos.x, pos.y), this.explodeEffects, this.audio))
      }
      this.count++;
    }
  }
}