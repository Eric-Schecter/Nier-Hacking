import React, { useRef, useReducer } from 'react';

import s from './Home.scss';
import { useSize, useKeyBoard, useBgMusic, useDraw, usePauseSound } from './hooks';
import { drawReducer } from './reducer';
import { Result } from './types';
export const ratio = window.devicePixelRatio;
export const bgRatio = 1.5;

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { bgRef } = useBgMusic();
  const { size } = useSize(ref);
  const { initState, reducer } = drawReducer;
  const [state, dispatch] = useReducer(reducer, initState);
  const { result } = useDraw(canvasRef, size, state);
  usePauseSound(state);
  useKeyBoard(state, dispatch,result);

  return <div ref={ref} className={s.root}>
    <audio ref={bgRef} src='/media/bg.wav' />
    <canvas
      ref={canvasRef}
      style={{ width: `${size.width * bgRatio}px`, height: `${size.height * bgRatio}px` }}
      width={size.width * bgRatio * ratio} height={size.height * bgRatio * ratio}
    />
    {state.isPause && <div className={s.block} >
      <p className={s.title}>PAUSED</p>
    </div>}
    {result !== Result.play && <div className={s.block} >
      <p className={s.title}>{result === Result.success ? 'HACKING COMPLETE' : 'HACKING FAIL'}</p>
      <p className={s.option}>{result === Result.success ? 'Next Stage' : 'Play Again'}</p>
    </div>}
  </div>
}

export default Home;