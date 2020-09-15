import { Vector } from '../../../base';
import { BulletPlayer } from '../../../bullet';
import { type,moveMode } from '../../../bullet/property';

@type('rect')
@moveMode('direct')
class BulletPlayerNormal extends BulletPlayer { }

export const normal = (target: any): Function => {
  return class extends target {
    fire = () => {
      this.bullets.add(new BulletPlayerNormal(this.ctx, new Vector(this.pos.x, this.pos.y), this.angle, this.audio))
    }
  }
}