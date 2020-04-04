import { Vector } from '../../../Base';
import { BulletEnemy } from '../../../Bullet';
import { type } from '../../../Bullet/property';

@type('ball')
class BulletEnemyNormal extends BulletEnemy{}

export const quickScatter = (target: any):Function => {
  return class extends target {
    protected fireSpeed = 10;
    private angleFire = Math.PI / 180 * 30;
    protected fire = (pos: Vector) => {
      if (this.count % this.fireSpeed === 0 && this.count % 100 < 70) {
        const target1 = new Vector(pos.x, pos.y);
        const dir = new Vector(pos.x, pos.y);
        dir.sub(new Vector(this.pos.x, this.pos.y));
        const target2 = new Vector(dir.x * Math.cos(this.angleFire) - dir.y * Math.sin(this.angleFire), dir.x * Math.sin(this.angleFire) + dir.y * Math.cos(this.angleFire));
        const target3 = new Vector(dir.x * Math.cos(-this.angleFire) - dir.y * Math.sin(-this.angleFire), dir.x * Math.sin(-this.angleFire) + dir.y * Math.cos(-this.angleFire));
        this.bullet.add(new BulletEnemyNormal(this.ctx, new Vector(this.pos.x, this.pos.y),
          target1, this.explodeEffectBullet, this.audio))
        this.bullet.add(new BulletEnemyNormal(this.ctx, new Vector(this.pos.x, this.pos.y),
          target2, this.explodeEffectBullet, this.audio))
        this.bullet.add(new BulletEnemyNormal(this.ctx, new Vector(this.pos.x, this.pos.y),
          target3, this.explodeEffectBullet, this.audio))
      }
      this.count++;
    }
  }
}