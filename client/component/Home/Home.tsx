import React, { useRef, useState, useEffect, useReducer } from 'react';

import s from './Home.scss';
import { MoveType,Size } from './types'
import { Vector, Enemy, Player } from './class';
import { drawReducer, State, Action } from './reducer';
const keyArr = Object.values(MoveType).filter(d => typeof (d) === 'number');
const keyPairs = Object.entries(MoveType).filter(d => typeof (d[1]) === 'number');

const useSize = (ref: React.RefObject<HTMLDivElement>) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (ref.current) {
      setSize({ width: ref.current.offsetWidth, height: ref.current.offsetHeight })
    }
  }, [ref.current])
  return { size };
}

const useKeyBoard = () => {
  const { initState, reducer } = drawReducer;
  const [state, dispatch] = useReducer(reducer, initState);
  const [downKeys, setDownKeys] = useState<Array<number>>([]);
  const downKeysRef = useRef<Array<number>>([]);
  const down = (e: KeyboardEvent) => {
    if (keyArr.some(d => d === e.keyCode) && !downKeysRef.current.some(d => d === e.keyCode)) {
      downKeysRef.current.push(e.keyCode)
      setDownKeys([...downKeysRef.current])
    }
  }
  const up = (e: any) => {
    const filtered = downKeysRef.current.filter(d => d !== e.keyCode);
    downKeysRef.current = filtered;
    setDownKeys(filtered)
  }
  useEffect(() => {
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);

    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    }
  }, [])
  return { state, dispatch, downKeys };
}

const useKeyBoardLogic = (downKeys: Array<number>, dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    if (!downKeys.length) {
      dispatch({ type: 'init' });
      return;
    }
    const arr: Array<number> = [];
    const groupLR = [MoveType.left, MoveType.right];
    const groupTD = [MoveType.top, MoveType.down];
    const groupAngle = [MoveType.turnLeft, MoveType.turnRight];
    for (let i = downKeys.length - 1; i >= 0; i--) {
      if (arr.some(d => downKeys[i] === d)
        && (groupLR.some(sd => downKeys[i] === sd)
          || groupTD.some(sd => downKeys[i] === sd)
          || groupAngle.some(sd => downKeys[i] === sd))) {
        continue;
      }
      arr.push(downKeys[i]);
    }

    dispatch({ type: 'init' });
    arr.forEach(d => {
      keyPairs.forEach((sd) => sd[1] === d && dispatch({ type: sd[0] }))
    })
  }, [downKeys])
}

const useMovePara = (state: State) => {
  const vRef = useRef(state.pos);
  const angleRef = useRef(state.angle);

  useEffect(() => {
    vRef.current = state.pos;
    angleRef.current = state.angle
  }, [state])
  return { vRef, angleRef };
}

const useDraw = (canvasRef: React.RefObject<HTMLCanvasElement>, size:Size, state: State) => {
  const { vRef, angleRef } = useMovePara(state)

  useEffect(() => {
    let timer: number;
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (!context) { return; }
      const { width, height } = size;
      const enemy = new Enemy(context, new Vector(width, height * 3 / 5));
      const player = new Player(context, new Vector(width, height * 8 / 5));
      const v = new Vector(0, 0);
      let angle = 0;
      const draw = () => {
        context.clearRect(0, 0, width * 2, height * 2);
        v.x = vRef.current.x;
        v.y = vRef.current.y;
        angle = angleRef.current;
        player.update(v, angle);
        enemy.display();
        player.display();
        timer = requestAnimationFrame(draw);
      }
      timer = requestAnimationFrame(draw)
    }

    return () => cancelAnimationFrame(timer);
  }, [canvasRef.current])
}

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { size } = useSize(ref);
  const { state, dispatch, downKeys } = useKeyBoard();
  useKeyBoardLogic(downKeys, dispatch);
  useDraw(canvasRef, size, state);

  return <div ref={ref} className={s.root}>
    <canvas
      ref={canvasRef}
      style={{ width: `${size.width}px`, height: `${size.height}px` }}
      width={size.width * 2} height={size.height * 2}
    />
  </div>
}

export default Home;