export const ball = (target: any): Function => {
  return class extends target {
    protected draw = () => {
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
      this.ctx.arc(this.pos.x, this.pos.y, 50, 0, Math.PI * 2, false);
      this.ctx.fill();
    }
  }
}