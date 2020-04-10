import { Vector } from '../../../base';
import { BulletEnemy } from '../../../bullet';
import { state, type,moveMode,explodeEffect } from '../../../bullet/property';

@type('ball')
@state('invincible')
@moveMode('normal')
@explodeEffect('normal')
export class BulletEnemyInvincible extends BulletEnemy { }

@type('ball')
@moveMode('normal')
@explodeEffect('normal')
export class BulletEnemyNormal extends BulletEnemy { }

export const scatter = (target: any): Function => {
  return class extends target {
    protected fireSpeed = 10;
    private countAngle = 90;
    protected fire = (pos: Vector) => {
      if (this.count % this.fireSpeed === 0) {
        const target1 = new Vector(this.pos.x + Math.cos(this.countAngle / 180 * Math.PI), this.pos.y + Math.sin(this.countAngle / 180 * Math.PI));
        const target2 = new Vector(this.pos.x + Math.cos((this.countAngle + 90) / 180 * Math.PI), this.pos.y + Math.sin((this.countAngle + 90) / 180 * Math.PI));
        const target3 = new Vector(this.pos.x + Math.cos((this.countAngle + 180) / 180 * Math.PI), this.pos.y + Math.sin((this.countAngle + 180) / 180 * Math.PI));
        const target4 = new Vector(this.pos.x + Math.cos((this.countAngle + 270) / 180 * Math.PI), this.pos.y + Math.sin((this.countAngle + 270) / 180 * Math.PI));
        this.bullet.add(new BulletEnemyNormal(this.ctx, new Vector(this.pos.x, this.pos.y),
          target1, this.explodeEffects, this.audio))
        this.bullet.add(new BulletEnemyInvincible(this.ctx, new Vector(this.pos.x, this.pos.y),
          target2, this.explodeEffects, this.audio))
        this.bullet.add(new BulletEnemyNormal(this.ctx, new Vector(this.pos.x, this.pos.y),
          target3, this.explodeEffects, this.audio))
        this.bullet.add(new BulletEnemyInvincible(this.ctx, new Vector(this.pos.x, this.pos.y),
          target4, this.explodeEffects, this.audio))
        this.countAngle += 10;
      }
      this.count++;
    }
  }
}