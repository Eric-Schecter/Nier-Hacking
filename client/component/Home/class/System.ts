import { Shape, Wave, Particle, BubbleLine,Ray } from './Explode';

export abstract class System {
  protected list: Array<Shape | Wave | Particle | BubbleLine | Ray> = [];
  constructor(protected ctx: CanvasRenderingContext2D) { }
  remove = (i: number) => {
    this.list.splice(i, 1);
  }
  display = () => {
    this.list.forEach((d, i) => {
      if (d.isDead()) {
        return this.remove(i);
      }
      d.display();
    })
  }
}