export const core = (target: any): Function => {
  return class extends target {
    protected draw = () => {
      this.ctx.save();
      this.rotate();
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(94,90,86,${this.opacity})`;
      this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}