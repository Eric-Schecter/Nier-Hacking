import { sounds } from '../../../../../../sounds';
const { hitEnemy } = sounds;

export const slow = (target: any): Function => {
  return class extends target {
    protected life = 10;
    protected sound = hitEnemy.src;
    protected color = [100, 100, 100];
    // private count = 0;
    // private iniSpeed = 10;
    // protected update = (pos: Vector) => {
    //   this.v = new Vector(pos.x, pos.y)
    //   this.v.sub(this.pos);
    //   this.v.normalize();
    //   this.v.mult(this.speed);
    //   const v1 = new Vector(Math.cos(this.radian), Math.sin(this.radian));
    //   this.radian += (v1.getRadius(this.v) - Math.PI / 2) / 10;
    //   this.pos.add(this.v);
    //   this.speed = this.iniSpeed - this.iniSpeed * Math.tanh(this.count / 400);
    //   if (this.pos.dis(pos) < this.iniSpeed * 2 || this.speed <= 1) {
    //     this.life = 0;
    //   }
    //   this.count++;
    // }
    protected draw = () => {
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
      this.ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2, false);
      this.ctx.fill();
    }
  }
}