import { MoveUnit, MoveUnits } from './Unit';
import { Vector } from './Vector';
import { Bullets, BulletPlayer } from './Bullet';
import { ExplodeEffectPlayer } from './explode';
import { Enemys } from './Enemy';
import { Floor } from './Floor';

export class Player extends MoveUnit {
  protected yTop = 80;
  protected yBottom = 40;
  protected xLeft = 30;
  protected xRight = 30;
  private xBorder = 25;
  private yBorder = 10;
  private xLine = 18;
  private yLine = 15;
  private holeR = 10;
  private wingX = 30;
  private wingY = 30;
  private wingSize = 10;
  private step = 15;
  private angleRatio = 3;
  static sound = '';
  protected life = 3;
  private bullets: Bullets;
  protected soundDead = '/media/player_explode.wav';
  protected soundHit = '/media/player_hit.wav';
  protected damagePeriodTime = 1000;
  private hitWave = false;
  private hitWaveRadius = 0;

  constructor(ctx: CanvasRenderingContext2D, pos: Vector, angle: number, explodeEffect: ExplodeEffectPlayer, bullets: Bullets) {
    super(ctx, pos, angle, explodeEffect);
    this.bullets = bullets;
  }

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
    this.ctx.fillStyle = 'rgb(212,209,194)';
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
    this.ctx.fillStyle = 'rgb(212,209,194)';
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
    this.ctx.fillStyle = 'rgb(212,209,194)';
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

  private draw = () => {
    this.ctx.save();
    this.rotate();
    this.drawMainBody();
    this.life >= 2 && this.drawRightBody();
    this.life >= 3 && this.drawLeftBody();
    this.hitWave && this.drawHit();
    this.drawHole();
    this.ctx.restore();
  }

  private update = (v: Vector, angle: number, area: Floor) => {
    const { xBorder, yBorder } = this.borderCheck(v, area);
    if (xBorder) { v.x = 0; }
    if (yBorder) { v.y = 0; }
    v.normalize();
    v.mult(this.step);
    this.pos.add(v);
    this.radian += angle / 180 * Math.PI * this.angleRatio;
    this.angle += angle * this.angleRatio;
  }

  explode = () => {
    new Audio(this.soundDead).play();
    this.explodeEffect.add(this.pos);
  }

  protected hitEffect = () => {
    if (this.hitWave) { return; }
    new Audio(this.soundHit).play();
    this.hitWave = true;
    setTimeout(() => {
      this.hitWave = false;
      this.hitWaveRadius = 0;
    }, this.damagePeriodTime);
  }

  fire = () => {
    this.bullets.add(new BulletPlayer(this.ctx, new Vector(this.pos.x, this.pos.y), this.angle))
  }

  display = (objects: Array<{ pos: Vector, getSize: { width: number, height: number } }>,
    v: Vector, angle: number, area: Floor) => {
    this.hitCheck(objects);
    this.update(v, angle, area);
    this.draw();
  }
}

export class Players extends MoveUnits {
  list: Array<Player> = [];
  display = (bullets: Bullets, v: Vector, angle: number, enemys: Enemys, area: Floor) => {
    this.list.forEach((d, i) => {
      if (d.isDead()) {
        d.explode();
        this.remove(i)
      }
      d.display([...bullets.getList, ...enemys.list], v, angle, area)
    });
  }
}