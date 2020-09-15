import { useRef, useEffect, useState } from 'react';
import {
  Block, Vector, Bullets, Enemys, Player, Floor, Players, Explodes
} from '../class';
import { State } from '../reducer';
import { Size, Result } from '../types';
import { ratio } from '../Game';
import data from '../../../data/map';
import { getContext } from '../../Home/Home';
import { sounds } from '../../../sounds';
import { useFire } from './useFire';
import { enemys as enemysData } from '../../../data/enemy';

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

const useStateRef = (state: State) => {
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state])
  return { stateRef };
}

const clump = (current: number, min: number, max: number) => {
  return current < min
    ? min
    : current > max
      ? max
      : current;
}

const reFresh = (ctx: CanvasRenderingContext2D, player: React.RefObject<Player>,
  v: Vector, pos: { x: number, y: number }, canvasRef: React.RefObject<HTMLCanvasElement>, floor: Floor) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (canvasRef.current) { canvasRef.current.width = canvasRef.current.width }
  // ctx.clearRect(0, 0, width * bgRatio * ratio, height * bgRatio * ratio);
  const { left, right, top, bottom, vWidth, vHeight, wWidth, wHeight } = floor.getSize;
  player.current && ctx.translate(
    -clump(player.current.pos.x - vWidth / 2, -left, right - (wWidth - right < vWidth / 2 ? vWidth : wWidth - right)),
    -clump(player.current.pos.y - vHeight / 2, -top, bottom - (wHeight - bottom < vHeight / 2 ? vHeight : wHeight - bottom))
  );
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
      const { xSRatio, ySRatio, wSRatio, hSRatio, wWRatio, hWRatio } = data[sceneRef.current].map;
      const floor = new Floor(
        context,
        new Vector(width * ratio * xSRatio, height * ratio * ySRatio),
        width * ratio * wSRatio, height * ratio * hSRatio,
        width * ratio * wWRatio, height * ratio * hWRatio,
        width * ratio, height * ratio,
      );
      const { left, top, sWidth, sHeight } = floor.getSize;
      const map = createMap(context, width, height);

      const bulletsEnemy = new Bullets(context);
      const bulletsPlayer = new Bullets(context);
      const explodes = new Explodes(context);
      // const explodeEffect = new ExplodeEffect(context);
      // const explodeEffectPlayer = new ExplodeEffectPlayer(context);
      // const explodeEffectBullet = new ExplodeEffectBullet(context);
      // const explodes = [explodeEffect, explodeEffectPlayer, explodeEffectBullet];
      const players = new Players();
      data[sceneRef.current].players.forEach((d, i) => {
        const temp = new d.type(context, new Vector(left + d.x * sWidth, top + d.y * sHeight), 0, explodes, bulletsPlayer, audioRef.current)
        if (i === 0) { player.current = temp } //target the first player
        players.add(temp)
      })

      const enemys = new Enemys();
      const endlessMark = sceneRef.current === data.length - 1;
      const createEnemys = (max: number) => {
        const len = enemys.getList.length;
        for (let i = 0; i < max - len; i++) {
          const index = Math.floor(Math.random() * enemysData.length);
          enemys.add(
            new enemysData[index](context, new Vector(left + 0.5 * sWidth, top + 0.5 * sHeight), 0, explodes, bulletsEnemy, audioRef.current)
          )
        }
      }
      !endlessMark
        ? data[sceneRef.current].enemys.forEach(d => enemys.add(
          new d.type(context, new Vector(left + d.x * sWidth, top + d.y * sHeight), 0, explodes, bulletsEnemy, audioRef.current)
        ))
        : createEnemys(3);
      const v = new Vector(0, 0);

      const draw = () => {
        if (stateRef.current.isPause) {
          return timer = requestAnimationFrame(draw);
        }

        reFresh(context, player, v, stateRef.current.pos, canvasRef, floor);
        floor.display();
        // map.map(d => d.display());
        endlessMark && createEnemys(3);
        players.update(v, stateRef.current.angle, enemys, floor);

        if (!isEndRef.current && visited) {
          if (endlessMark && player.current.isDead()) {
            isEndRef.current = true;
            setResult(Result.fail);
          } else if ((!enemys.getList.length || player.current.isDead())) {
            isEndRef.current = true;
            setResult(enemys.getList.length ? Result.fail : Result.success);
          }
          enemys.getList.forEach(d => d.update(player.current.pos, floor, enemys.getList));
          bulletsPlayer.update([enemys, bulletsEnemy], floor);
        }
        
        bulletsEnemy.getList.forEach(d => d.update(player.current.pos));
        bulletsEnemy.update([players, bulletsPlayer], floor);

        enemys.update();
        explodes.display(players);

        timer = requestAnimationFrame(draw);
      }
      timer = requestAnimationFrame(draw)
    }

    return () => cancelAnimationFrame(timer);
  }, [canvasRef.current, isStart, refresh, visited])
  return { result, setResult, setRefresh, isEndRef };
}