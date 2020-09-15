import { Vector } from '../../../base';
import { BulletEnemy } from '../../../bullet';
import { type, effect,moveMode, speed,explodeEffect } from '../../../bullet/property';

@type('magnetic')
@effect('magnetic')
@moveMode('normal')
@speed('slow')
@explodeEffect('normal')
class BulletEnemyMag extends BulletEnemy { }

export const magnetic = (target: any): Function => {
  return class extends target {
    protected fire = (pos: Vector) => {
      if (this.count % this.fireSpeed === 0) {
        this.bullet.add(new BulletEnemyMag(this.ctx, new Vector(this.pos.x, this.pos.y), new Vector(pos.x, pos.y), this.explodeEffects, this.audio))
      }
      this.count++;
    }
  }
}