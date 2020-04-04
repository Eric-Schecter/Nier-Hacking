export const block = (target: any): Function => {
  return class extends target {
    protected radian = Math.PI / 4;
    protected width = 80;
    protected height = 80;
    protected draw = () => {
      this.ctx.save();
      this.rotate();
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(94,90,86,${this.opacity})`;
      this.ctx.rect(this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height);
      this.ctx.fill();
      this.isProtected && this.protection.update(this.pos);
      this.ctx.restore();
    }
  }
}