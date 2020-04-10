import { Vector } from '../../../base';
import { BulletEnemy } from '../../../bullet';
import { type ,moveMode} from '../../../bullet/property';

@type('ball')
@moveMode('normal')
class BulletEnemyNormal extends BulletEnemy{}

export const fixedScatter = (target: any):Function => {
  return class extends target {
    protected fire = () => {
      if (this.count % this.fireSpeed === 0) {
        const target1 = new Vector(this.pos.x+1, this.pos.y-1);
        const target2 = new Vector(this.pos.x+1, this.pos.y+1);
        const target3 = new Vector(this.pos.x-1, this.pos.y+1);
        const target4 = new Vector(this.pos.x-1, this.pos.y-1);
          this.bullet.add(new BulletEnemyNormal(this.ctx, new Vector(this.pos.x, this.pos.y),
          target1, this.explodeEffects, this.audio))
        this.bullet.add(new BulletEnemyNormal(this.ctx, new Vector(this.pos.x, this.pos.y),
          target2, this.explodeEffects, this.audio))
        this.bullet.add(new BulletEnemyNormal(this.ctx, new Vector(this.pos.x, this.pos.y),
          target3, this.explodeEffects, this.audio))
          this.bullet.add(new BulletEnemyNormal(this.ctx, new Vector(this.pos.x, this.pos.y),
          target4, this.explodeEffects, this.audio))
      }
      this.count++;
    }
  }
}