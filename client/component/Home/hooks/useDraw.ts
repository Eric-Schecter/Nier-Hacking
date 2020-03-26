import { useRef, useEffect, useState } from 'react';
import {
  Block, Vector, Bullets, Enemy, Enemys, Player, ProtectedEmeny,
  ExplodeEffect, Floor, Players, ExplodeEffectPlayer,ExplodeEffectBullet
} from '../class';
import { State } from '../reducer';
import { Size, Result } from '../types';
import { ratio, bgRatio } from '../Home';
import { data } from '../map';

const buildBlocks = (context: CanvasRenderingContext2D, wCount: number, hCount: number) => {
  const blocks = [];
  for (let i = 0; i < wCount; i++) {
    blocks.push(new Block(context, new Vector(100 * i, 0)));
    blocks.push(new Block(context, new Vector(100 * i, 100 * (hCount - 1))))
  }
  for (let i = 0; i < hCount; i++) {
    blocks.push(new Block(context, new Vector(0, 100 * i)));
    blocks.push(new Block(context, new Vector(100 * (wCount - 1), 100 * i)))
  }
  return blocks;
}

const useFire = (state: State, player: React.RefObject<Player>) => {
  const fireRef = useRef(0);
  useEffect(() => {
    let count = 0;
    const fire = () => {
      player.current && count % 7 === 0 && player.current.fire();
      count++;
      fireRef.current = requestAnimationFrame(fire);
    };

    if (state.fire) {
      fireRef.current = requestAnimationFrame(fire);
    } else {
      cancelAnimationFrame(fireRef.current);
    }
    return () => cancelAnimationFrame(fireRef.current);
  }, [state.fire])
}

const useStateRef = (state: State) => {
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state])
  return { stateRef };
}

const reFresh = (ctx: CanvasRenderingContext2D, width: number, height: number,
  player: React.RefObject<Player>, v: Vector, pos: { x: number, y: number }) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width * bgRatio * ratio, height * bgRatio * ratio);
  player.current && ctx.translate(width * bgRatio * ratio / 2 - player.current.pos.x, height * bgRatio * ratio / 2 - player.current.pos.y);
  v.x = pos.x;
  v.y = pos.y;
}

const createMap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const wCount = Math.floor(width * ratio / 100);
  const hCount = Math.floor(height * ratio / 100);
  const blocks = buildBlocks(ctx, wCount, hCount);
  return blocks;
}

export const useDraw = (canvasRef: React.RefObject<HTMLCanvasElement>, size: Size, state: State) => {
  const player = useRef<any>(null);
  const { stateRef } = useStateRef(state);
  const [result, setResult] = useState(Result.play);
  const isEndRef = useRef(false);
  useFire(state, player);
  useEffect(() => {
    if (isEndRef.current && result === Result.success) {
      setTimeout(() => {
        new Audio('/media/success.ogg').play();
      }, 700);
    }
  }, [isEndRef.current])
  useEffect(() => {
    let timer: number;
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (!context) { return; }
      const { width, height } = size;
      const { xRatio, yRatio, wRatio, hRatio } = data.map;
      const floor = new Floor(
        context,
        new Vector(width * ratio * xRatio, height * ratio * yRatio),
        width * ratio * wRatio, height * ratio * hRatio);
      const { left, top, width: fWidth, height: fHeight } = floor.getSize;
      const map = createMap(context, width, height);

      const bulletsEnemy = new Bullets(context);
      const bulletsPlayer = new Bullets(context);
      const explodeEffect = new ExplodeEffect(context);
      const explodeEffectPlayer = new ExplodeEffectPlayer(context);
      const explodeEffectBullet = new ExplodeEffectBullet(context);
      
      player.current = new Player(context, new Vector(width * ratio, height * ratio), 0, explodeEffectPlayer, bulletsPlayer);
      const players = new Players();
      players.add(player.current)

      const enemys = new Enemys();
      data.enemys.forEach(d => enemys.add(
        d.isProtected
          ? new ProtectedEmeny(context, new Vector(left + d.x * fWidth, top + d.y * fHeight), 0, explodeEffect, bulletsEnemy,explodeEffectBullet)
          : new Enemy(context, new Vector(left + d.x * fWidth, top + d.y * fHeight), 0, explodeEffect, bulletsEnemy,explodeEffectBullet)
      ))
      const v = new Vector(0, 0);

      const draw = () => {
        if (stateRef.current.isPause) {
          return timer = requestAnimationFrame(draw);
        }
        reFresh(context, width, height, player, v, stateRef.current.pos);
        floor.display();
        // map.map(d => d.display());
        players.display(bulletsEnemy, v, stateRef.current.angle, enemys, floor);
        if (!enemys.list.length || player.current.isDead()) {
          if (!isEndRef.current) {
            isEndRef.current = true;
            !enemys.list.length
              ? setResult(Result.success)
              : setResult(Result.fail)
          };
        }
        !player.current.isDead() && enemys.list.forEach(d => d.update(player.current.pos));

        enemys.display(bulletsPlayer, enemys);
        explodeEffect.display();
        explodeEffectPlayer.display();
        explodeEffectBullet.display();
        bulletsEnemy.update([player.current, ...bulletsPlayer.getList], floor);
        bulletsPlayer.update([...enemys.list, ...bulletsEnemy.getList], floor);

        timer = requestAnimationFrame(draw);
      }
      timer = requestAnimationFrame(draw)
    }

    return () => cancelAnimationFrame(timer);
  }, [canvasRef.current])
  return { result };
}