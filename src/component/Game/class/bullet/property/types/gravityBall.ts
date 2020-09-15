import { sounds } from '../../../../../../sounds';
const { hitEnemy ,effectField} = sounds;

export const gravityBall = (target: any): Function => {
  return class extends target {
    protected life = 3;
    protected sound = hitEnemy.src;
    protected soundExplode = effectField.src;
    protected color = [100, 100, 100];
    private drawOuterBall = () => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
      this.ctx.lineWidth = 3;
      this.ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},0.5)`;
      this.ctx.arc(this.pos.x, this.pos.y, 50, 0, Math.PI * 2, false);
      this.ctx.stroke();
      this.ctx.fill();
    }
    private drawInnerBall = () => {
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
      this.ctx.arc(this.pos.x, this.pos.y, 20, 0, Math.PI * 2, false);
      this.ctx.fill();
    }
    private drawLightning = () => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
      this.ctx.lineWidth = 5;
      for (let i = 0; i < 20; i++) {
        const r = 50 * Math.random();
        const theta = Math.PI * 2 * Math.random();
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        this.ctx.moveTo(this.pos.x, this.pos.y);
        this.ctx.lineTo(this.pos.x + x, this.pos.y + y);
      }
      this.ctx.stroke();
    }
    protected draw = () => {
      this.drawOuterBall();
      this.drawInnerBall();
      this.drawLightning();
    }
  }
}