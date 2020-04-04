export const plane = (target: any): Function => {
  return class extends target {
    private xBorder = 25;
    private yBorder = 10;
    private xLine = 18;
    private yLine = 15;
    private holeR = 10;
    private wingX = 30;
    private wingY = 30;
    private wingSize = 10;
    private drawLeftWing = () => {
      this.ctx.beginPath();
      this.ctx.rect(this.pos.x - this.wingX - this.wingSize / 2, this.pos.y + this.wingY - this.wingSize / 2, this.wingSize, this.wingSize);
      this.ctx.fill();
    }
  
    private drawRightWing = () => {
      this.ctx.beginPath();
      this.ctx.rect(this.pos.x + this.wingX - this.wingSize / 2, this.pos.y + this.wingY - this.wingSize / 2, this.wingSize, this.wingSize);
      this.ctx.fill();
    }
  
    private drawLineMain = () => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'grey';
      this.ctx.moveTo(this.pos.x - this.xLine, this.pos.y - this.yLine)
      this.ctx.lineTo(this.pos.x, this.pos.y);
      this.ctx.moveTo(this.pos.x + this.xLine, this.pos.y - this.yLine);
      this.ctx.lineTo(this.pos.x, this.pos.y);
      this.ctx.stroke();
    }
  
    private drawLineLeft = () => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'grey';
      this.ctx.moveTo(this.pos.x - this.xLine, this.pos.y - this.yLine)
      this.ctx.lineTo(this.pos.x, this.pos.y);
      this.ctx.moveTo(this.pos.x, this.pos.y + this.yBottom);
      this.ctx.lineTo(this.pos.x, this.pos.y);
      this.ctx.stroke();
    }
  
    private drawLineRight = () => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'grey';
      this.ctx.moveTo(this.pos.x + this.xLine, this.pos.y - this.yLine);
      this.ctx.lineTo(this.pos.x, this.pos.y);
      this.ctx.moveTo(this.pos.x, this.pos.y + this.yBottom);
      this.ctx.lineTo(this.pos.x, this.pos.y);
      this.ctx.stroke();
    }
  
    private drawMainBody = () => {
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
      this.ctx.moveTo(this.pos.x, this.pos.y - this.yTop);
      this.ctx.lineTo(this.pos.x - this.xLine, this.pos.y - this.yLine);
      this.ctx.lineTo(this.pos.x, this.pos.y);
      this.ctx.lineTo(this.pos.x + this.xLine, this.pos.y - this.yLine);
      this.ctx.closePath();
      this.ctx.fill();
      this.drawLineMain();
    }
  
    private drawLeftBody = () => {
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
      this.ctx.moveTo(this.pos.x, this.pos.y);
      this.ctx.lineTo(this.pos.x - this.xLine, this.pos.y - this.yLine);
      this.ctx.lineTo(this.pos.x - this.xBorder, this.pos.y + this.yBorder);
      this.ctx.lineTo(this.pos.x, this.pos.y + this.yBottom);
      this.ctx.closePath();
      this.ctx.fill();
      this.drawLeftWing();
      this.drawLineLeft();
    }
  
    private drawRightBody = () => {
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
      this.ctx.moveTo(this.pos.x, this.pos.y);
      this.ctx.lineTo(this.pos.x + this.xLine, this.pos.y - this.yLine);
      this.ctx.lineTo(this.pos.x + this.xBorder, this.pos.y + this.yBorder);
      this.ctx.lineTo(this.pos.x, this.pos.y + this.yBottom);
      this.ctx.closePath();
      this.ctx.fill();
      this.drawRightWing();
      this.drawLineRight();
    }
  
    private drawHole = () => {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'black';
      this.ctx.moveTo(this.pos.x, this.pos.y);
      this.ctx.arc(this.pos.x, this.pos.y, this.holeR, 0, Math.PI * 2, false);
      this.ctx.fill();
    }
  
    private drawHit = () => {
      this.ctx.save()
      this.ctx.beginPath();
      this.ctx.strokeStyle = `rgba(255,255,255, ${1 - this.hitWaveRadius * 0.05})`;
      this.ctx.lineWidth = 100;
      this.ctx.shadowColor = 'lightgrey';
      this.ctx.shadowBlur = 10;
      this.ctx.arc(this.pos.x, this.pos.y, this.hitWaveRadius * 13, 0, Math.PI * 2, false);
      this.ctx.stroke();
      this.ctx.restore();
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(255,0,0, ${0.8 - Math.tanh(this.hitWaveRadius * 0.05)})`;
      this.ctx.moveTo(this.pos.x, this.pos.y);
      this.ctx.arc(this.pos.x, this.pos.y, Math.tanh(this.hitWaveRadius * 0.1) * 150, 0, Math.PI * 2, false);
      this.ctx.fill();
      this.ctx.restore();
      this.ctx.beginPath();
      const fadeCurve = (changeTime: number, value: number) =>
        this.damagePeriodTime > changeTime
          ? value - Math.tanh(this.hitWaveRadius * value / 10) * value
          : Math.tanh(this.hitWaveRadius * value / 10) * value;
      const strokeO = fadeCurve(500, 0.5);
      const fillO = fadeCurve(500, 0.2);
      this.ctx.strokeStyle = `rgba(0,0,0,${strokeO})`;
      this.ctx.fillStyle = `rgba(0,0,0, ${fillO})`;
      this.ctx.lineWidth = 5;
      this.ctx.arc(this.pos.x, this.pos.y, Math.tanh(this.hitWaveRadius * 0.1) * 150, 0, Math.PI * 2, false);
      this.ctx.fill();
      this.ctx.stroke();
      this.hitWaveRadius++;
    }
  
    protected draw = () => {
      this.ctx.save();
      this.rotate();
      this.drawMainBody();
      this.life >= 2 && this.drawRightBody();
      this.life >= 3 && this.drawLeftBody();
      this.hitWave && this.drawHit();
      this.drawHole();
      this.ctx.restore();
    }
  }
}