export const rect = (target: any): Function => {
  return class extends target {
    display = () => {
      const { width, height } = this.getSize;
      this.update();
      this.fire();
      this.ctx.save();
      this.rotate();
      this.ctx.beginPath();
      this.ctx.fillStyle = 'whitesmoke';
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = 'whitesmoke';
      this.ctx.rect(this.pos.x - width / 2, this.pos.y - this.yTop, width, height);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}