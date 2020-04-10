export const guard = (target: any):Function => {
  return class extends target {
    protected width = this.isProtected ? 200 : 50;
    protected height = this.isProtected ? 200 : 100;
    protected life = 5;
    protected gravity = 5;
    protected draw = () => {
      this.ctx.save();
      this.rotate();
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(94,90,86,${this.opacity})`;
      this.ctx.rect(this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height / 2);
      this.ctx.moveTo(this.pos.x - this.width / 2, this.pos.y + 5);
      this.ctx.lineTo(this.pos.x + this.width / 2, this.pos.y + 5);
      this.ctx.lineTo(this.pos.x  , this.pos.y  + this.height/2);
      this.ctx.closePath();
      this.ctx.fill();
      this.isProtected && this.protection.update(this.pos);
      this.ctx.restore();
    }
  }
}