export const magnetic = (target: any): Function => {
  return class extends target {
    protected color = [50, 50, 50];
    private count = 0;
    protected life = 2;
    protected draw = () => {
      this.ctx.save();
      this.rotate();
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},0.7)`;
      this.ctx.shadowBlur = 100;
      this.ctx.shadowColor = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`
      for (let j = 0; j < 360; j += 20) {
        this.ctx.moveTo(this.pos.x, this.pos.y);
        for (let i = 0; i < 100; i++) {
          const x = this.pos.x + Math.cos((this.count + j) / 180 * Math.PI * 10) * i / 2;
          const y = this.pos.y + Math.sin((this.count + j) / 180 * Math.PI * 10) * i / 2;
          this.ctx.lineTo(x, y);
          this.count += 0.1;
        }
        this.count = 0;
      }
      this.ctx.fill();
      this.ctx.restore();
      this.radian += 0.1;
    }
  }
}