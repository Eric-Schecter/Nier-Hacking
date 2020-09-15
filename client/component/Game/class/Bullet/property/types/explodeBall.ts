import { sounds } from '../../../../../../sounds';
const { hitEnemy,effectField } = sounds;

export const explodeBall = (target: any): Function => {
  return class extends target {
    protected life = 3;
    protected sound = hitEnemy.src;
    protected soundExplode = effectField.src;
    protected color = [100, 100, 100];
    private count = 0;
    protected draw = () => {
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
      this.ctx.arc(this.pos.x, this.pos.y, 25 + Math.sin(this.count / 5) * 5, 0, Math.PI * 2, false);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.strokeStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
      this.ctx.lineWidth = 5;
      this.ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},0.5)`;
      this.ctx.arc(this.pos.x, this.pos.y, 50, 0, Math.PI * 2, false);
      this.ctx.fill();
      this.ctx.stroke()
      this.count++;
    }
  }
}