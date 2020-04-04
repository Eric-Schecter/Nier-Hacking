import React, { FC, useRef, useReducer, useState } from 'react';

import s from './Game.scss';
import { useKeyBoard, useDraw, usePauseSound, useSysOpt, useBgMusic } from './hooks';
import { useSize, usePreLoad,useVistied } from '../../hooks';
import { drawReducer } from './reducer';
import { Props } from './types';
import { files } from './files';
import Des from '../Des';
import Cover from './Cover';
import Option from './Option';
import Pause from './Pause';
import Loading from './Loading';
import Display from './Display';

export const ratio = 2;
export const bgRatio = 1.5;

const Game: FC<Props> = ({ toMenu, sceneRef }) => {
  const [changeScene, setChangeScene] = useState(false);
  const { percent, isStart } = usePreLoad(files);
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useBgMusic();
  const { size } = useSize(ref);
  const { initState, reducer } = drawReducer;
  const [state, dispatch] = useReducer(reducer, initState);
  const { visited, setVisited } = useVistied('game');
  const { result, setResult, setRefresh, isEndRef } = useDraw(canvasRef, size, state, isStart, sceneRef, visited);
  usePauseSound(state, visited);
  useKeyBoard(state, dispatch, result, isEndRef, visited);
  const { isHide,isHiding } = useSysOpt(state, toMenu, sceneRef, result, setRefresh, setResult, isEndRef, setChangeScene, visited, setVisited);

  return <div ref={ref} className={`${s.root} ${isHide ? s.hide : ''}`}>
    <Loading isStart={isStart} percent={percent} size={size} />
    <Display canvasRef={canvasRef} size={size} bgRatio={bgRatio} ratio={ratio} />
    <Cover changeScene={changeScene} size={size} ratio={ratio} />
    <Pause state={state} />
    <Option result={result} />
    {!visited && isStart && <Des type='game' isHiding={isHiding}/>}
  </div>
}

export default Game;