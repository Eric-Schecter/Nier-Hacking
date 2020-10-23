import React, { FC, useRef, useReducer, useState } from 'react';

import styles from './styles.module.scss';
import { useKeyBoard, useDraw, usePauseSound, useSysOpt, useBgMusic } from './hooks';
import { useSize, usePreLoad, useVisited } from '../../hooks';
import { drawReducer } from './reducer';
import { Result, Props } from './types';
import { files } from './files';
import Des from '../Des/Des';
import Cover from './Cover/Cover';
import Option from './Option/Option';
import Loading from './Loading/Loading';
import Display from './Display/Display';

export const ratio = 2;
// export const bgRatio = 1.5;

const options = {
  pause: [
    { key: 'P', text: 'Cancel' },
    { key: 'R', text: 'Return to Menu' }
  ],
  complete: [
    { key: 'SPACE', text: 'Next Stage' },
    { key: 'R', text: 'Return to Menu' }
  ]
}

const Game: FC<Props> = ({ toMenu, sceneRef }) => {
  const [changeScene, setChangeScene] = useState(false);
  const { percent, isStart } = usePreLoad(files);
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useBgMusic();
  const { size } = useSize(ref);
  const { initState, reducer } = drawReducer;
  const [state, dispatch] = useReducer(reducer, initState);
  const { visited, setVisited } = useVisited('game');
  const { result, setResult, setRefresh, isEndRef } = useDraw(canvasRef, size, state, isStart, sceneRef, visited);
  usePauseSound(state, visited);
  useKeyBoard(state, dispatch, result, isEndRef, visited);
  const { isHide, isHiding } = useSysOpt(state, toMenu, sceneRef, result, setRefresh, setResult, isEndRef, setChangeScene, visited, setVisited);

  return <div ref={ref} className={`${styles.root} ${isHide ? styles.hide : ''}`}>
    <Loading isStart={isStart} percent={percent} size={size} />
    <Display canvasRef={canvasRef} size={size} ratio={ratio} />
    <Cover changeScene={changeScene} size={size} ratio={ratio} />
    {state.isPause
      && <Option title='PAUSED' op1={options.pause[0]} op2={options.pause[1]} />}
    {result === Result.success
      && <Option title='HACKING COMPLETE' op1={options.complete[0]} op2={options.complete[1]} />}
    {!visited && isStart && <Des type='game' isHiding={isHiding} />}
  </div>
}

export default Game;