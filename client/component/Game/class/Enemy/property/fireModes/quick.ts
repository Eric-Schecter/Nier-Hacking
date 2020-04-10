import { Vector } from '../../../base';
import { BulletEnemy } from '../../../bullet';
import { type,moveMode,explodeEffect } from '../../../bullet/property';

@type('ball')
@moveMode('normal')
@explodeEffect('normal')
class BulletEnemyNormal extends BulletEnemy{}

export const quick = (target: any):Function => {
  return class extends target {
    protected fireSpeed = 10;
    protected fire = (pos: Vector) => {
      if (this.count % this.fireSpeed === 0 && this.count % 100 < 60) {
        this.bullet.add(new BulletEnemyNormal(this.ctx, new Vector(this.pos.x, this.pos.y), new Vector(pos.x, pos.y), this.explodeEffects, this.audio))
      }
      this.count++;
    }
  }
}