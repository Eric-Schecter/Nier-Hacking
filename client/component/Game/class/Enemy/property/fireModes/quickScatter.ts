import { Vector } from '../../../base';
import { BulletEnemy } from '../../../bullet';
import { type ,moveMode,explodeEffect} from '../../../bullet/property';

@type('ball')
@moveMode('normal')
@explodeEffect('normal')
class BulletEnemyNormal extends BulletEnemy { }

export const quickScatter = (target: any): Function => {
  return class extends target {
    protected fireSpeed = 10;
    private angleFire = Math.PI / 180 * 30;
    protected fire = (pos: Vector) => {
      if (this.count % this.fireSpeed === 0 && this.count % 100 < 70) {
        const target1 = new Vector(pos.x, pos.y);
        const dir = new Vector(pos.x, pos.y);
        dir.sub(new Vector(this.pos.x, this.pos.y));
        const mag = dir.mag() * Math.sin(this.angleFire / 2) * 2;
        const target2 = new Vector(pos.x + Math.sin(this.angleFire) * mag, pos.y - Math.cos(this.angleFire) * mag);
        const target3 = new Vector(pos.x - Math.sin(this.angleFire) * mag, pos.y + Math.cos(this.angleFire) * mag);
        this.bullet.add(new BulletEnemyNormal(this.ctx, new Vector(this.pos.x, this.pos.y),
          target1, this.explodeEffects, this.audio))
        this.bullet.add(new BulletEnemyNormal(this.ctx, new Vector(this.pos.x, this.pos.y),
          target2, this.explodeEffects, this.audio))
        this.bullet.add(new BulletEnemyNormal(this.ctx, new Vector(this.pos.x, this.pos.y),
          target3, this.explodeEffects, this.audio))
      }
      this.count++;
    }
  }
}