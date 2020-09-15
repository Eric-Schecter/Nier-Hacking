export const arrow = (target: any): Function => {
  return class extends target {
    protected color = [94, 90, 86];
    protected life = 3;
    protected draw = () => {
      const size = 50;
      this.ctx.save();
      this.rotate();
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
      this.ctx.moveTo(this.pos.x, this.pos.y);
      this.ctx.lineTo(this.pos.x - size, this.pos.y - size);
      this.ctx.lineTo(this.pos.x + size, this.pos.y - size);
      this.ctx.closePath();
      this.ctx.moveTo(this.pos.x - size / 2, this.pos.y - size - 15);
      this.ctx.rect(this.pos.x - size / 2, this.pos.y - size - 15, size, 10);
      this.ctx.moveTo(this.pos.x - size / 2, this.pos.y - size - 30);
      this.ctx.rect(this.pos.x - size / 2, this.pos.y - size - 30, size, 10);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}