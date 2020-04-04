export class Cover {
  // private count = -3;
  // private angle = 0;
  private timer = 0;
  private color: Array<Array<Array<number>>>;
  private colorLevel = [100, 67, 30];
  private lenH = 300;
  private row = Math.ceil(this.width / this.lenH);
  private lenV = this.lenH * Math.sin(45 / 180 * Math.PI)
  private heightC = Math.ceil(this.height / this.lenV);
  constructor(protected ctx: CanvasRenderingContext2D, private width: number, private height: number) {
    this.color = new Array(this.row + 1)
      .fill(0)
      .map(() => new Array(this.heightC)
        .fill(0)
        .map(() => new Array(2)
          .fill(0)
          .map(() => Math.random() > 0.2 ? -1 : Math.floor(Math.random() * 3))));
  }
  // private drawBg = () => {
  //   this.ctx.beginPath()
  //   this.ctx.fillStyle = `rgba(215,215,215,${Math.exp(-Math.pow(this.count, 2) / 2)})`;
  //   this.ctx.rect(0, 0, this.width, this.height)
  //   this.ctx.fill();
  //   this.count += 30 / 1000;
  // }
  // private drawCircle = () => {
  //   this.ctx.beginPath();
  //   this.ctx.strokeStyle = `rgba(255,255,255,${Math.exp(-Math.pow(this.count, 2) / 2)})`;
  //   this.ctx.lineWidth = 100 * Math.exp(-Math.pow(this.count, 2) / 2);
  //   this.ctx.moveTo(this.width / 2, this.height / 2);
  //   for (let i = 0; i < 2000; i++) {
  //     const x = this.width / 2 + Math.cos(this.angle / 180 * Math.PI) * i * 2 * Math.exp(-Math.pow(this.count, 2) / 2);
  //     const y = this.height / 2 + Math.sin(this.angle / 180 * Math.PI) * i * 2 * Math.exp(-Math.pow(this.count, 2) / 2);
  //     this.ctx.lineTo(x, y);
  //     this.angle++;
  //   }
  //   this.ctx.stroke();
  // }
  private update = (mark: boolean) => {
    for (let i = 0; i < this.row + 1; i++) {
      for (let j = 0; j < this.heightC; j++) {
        for (let k = 0; k < 4; k++) {
          if (mark) {
            if (Math.random() > 0.3) {
              this.color[i][j][k] = 2;
            }
          } else {
            if (Math.random() > 0.5 && this.color[i][j][k] !== this.colorLevel.length - 1) {
              this.color[i][j][k]++;
            }
          }
        }
      }
    }
  }
  private drawRight = (i: number, j: number) => {
    this.ctx.moveTo(this.lenH * i, this.lenV * j);
    this.ctx.lineTo(this.lenH * (i + 1), this.lenV * j);
    this.ctx.lineTo(this.lenH * (i + 0.5), this.lenV * (j + 1));
  }
  private drawLeft = (i: number, j: number) => {
    this.ctx.moveTo(this.lenH * i, this.lenV * j);
    this.ctx.lineTo(this.lenH * (i - 0.5), this.lenV * (j + 1));
    this.ctx.lineTo(this.lenH * (i + 0.5), this.lenV * (j + 1));
  }
  private draw = (i: number, j: number, k: number, drawPart: (i: number, j: number) => void) => {
    this.ctx.beginPath();
    const color = this.colorLevel[this.color[i][j][k]];
    this.ctx.fillStyle = color ? `rgb(${color},${color},${color})` : 'transparent';
    j % 2 === 0 ? drawPart(i, j) : drawPart(i - 0.5, j);
    this.ctx.closePath()
    this.ctx.fill();
  }
  display = () => {
    if (this.timer % 10 === 0 && this.timer / 10 > 0) {
      this.update(this.timer / 10 > 3);
    }
    const heightC = Math.ceil(this.height / this.lenV);
    for (let i = 0; i < this.row + 1; i++) {
      for (let j = 0; j < heightC; j++) {
        this.draw(i, j, 0, this.drawRight);
        this.draw(i, j, 1, this.drawLeft);
      }
    }
    this.timer++;
  }
}