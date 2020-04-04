import { useRef, useEffect, useState } from 'react';
import {
  Block, Vector, Bullets, Enemys, Player,
  ExplodeEffect, Floor, Players, ExplodeEffectPlayer, ExplodeEffectBullet
} from '../class';
import { State } from '../reducer';
import { Size, Result } from '../types';
import { ratio, bgRatio } from '../Game';
import data from '../../../map';
import { getContext } from '../../Home/Home';
import { sounds } from '../../../sounds';

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

const reFresh = (ctx: CanvasRenderingContext2D, width: number, height: number, player: React.RefObject<Player>,
  v: Vector, pos: { x: number, y: number }, canvasRef: React.RefObject<HTMLCanvasElement>) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (canvasRef.current) { canvasRef.current.width = canvasRef.current.width }
  // ctx.clearRect(0, 0, width * bgRatio * ratio, height * bgRatio * ratio);
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

export const useDraw = (canvasRef: React.RefObject<HTMLCanvasElement>, size: Size, state: State, isStart: boolean,
  sceneRef: React.MutableRefObject<number>, visited: boolean) => {
  const player = useRef<any>(null);
  const { stateRef } = useStateRef(state);
  const [refresh, setRefresh] = useState(false);
  const [result, setResult] = useState(Result.play);
  const isEndRef = useRef(false);
  const audioRef = getContext();
  useFire(state, player);
  useEffect(() => {
    if (isEndRef.current && result === Result.success) {
      setTimeout(() => {
        audioRef.current?.play(sounds.success.src)
      }, 700);
    }
  }, [isEndRef.current])
  useEffect(() => {
    let timer: number;
    if (canvasRef.current && isStart) {
      const context = canvasRef.current.getContext('2d');
      if (!context) { return; }
      const { width, height } = size;
      const { xRatio, yRatio, wRatio, hRatio } = data[sceneRef.current].map;
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
      const explodes = [explodeEffect, explodeEffectPlayer, explodeEffectBullet];
      player.current = new Player(context, new Vector(width * ratio, height * ratio * 6 / 5), 0, explodeEffectPlayer, bulletsPlayer, audioRef.current);
      const players = new Players();
      players.add(player.current)

      const enemys = new Enemys();
      data[sceneRef.current].enemys.forEach(d => enemys.add(
        new d.type(context, new Vector(left + d.x * fWidth, top + d.y * fHeight), 0, explodeEffect, bulletsEnemy, explodeEffectBullet, audioRef.current)
      ))
      const v = new Vector(0, 0);

      const draw = () => {
        if (stateRef.current.isPause) {
          return timer = requestAnimationFrame(draw);
        }

        reFresh(context, width, height, player, v, stateRef.current.pos, canvasRef);
        floor.display();
        // map.map(d => d.display());
        players.update(v, stateRef.current.angle, enemys, floor);

        if (!isEndRef.current && visited) {
          if ((!enemys.getList.length || player.current.isDead()) && !isEndRef.current) {
            isEndRef.current = true;
            !enemys.getList.length
              ? setResult(Result.success)
              : setResult(Result.fail)
          }
          !player.current.isDead() && enemys.getList.forEach(d => d.update(player.current.pos, floor));
          bulletsEnemy.getList.forEach(d => d.update(player.current.pos));
          bulletsEnemy.update([players, bulletsPlayer], floor);
          bulletsPlayer.update([enemys, bulletsEnemy], floor);
        }

        enemys.update();
        explodes.forEach(d => d.display());

        timer = requestAnimationFrame(draw);
      }
      timer = requestAnimationFrame(draw)
    }

    return () => cancelAnimationFrame(timer);
  }, [canvasRef.current, isStart, refresh, visited])
  return { result, setResult, setRefresh, isEndRef };
}