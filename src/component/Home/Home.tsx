import React, { useRef, createContext, useContext, useState, useEffect } from 'react';

import Game from '../Game/Game';
import Opening from '../Opening';
import Menu from '../Menu';
import { Stage } from './types';
import { useStage } from './hooks/useStage';

const Context = createContext<any>({});
export const useGetContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('Components must be used within <Home />')
  }
  return context;
}

const Home = () => {
  const sceneRef = useRef<number>(0);
  const [isStart, setIsStart] = useState(false);
  const { stage, setStage, audioRef } = useStage(isStart);
  const toMenu = () => setStage(1);
  useEffect(()=>{
    if(isStart){
      document.body.requestPointerLock();
    }
  },[isStart])
  
  return <Context.Provider value={audioRef}>
    {stage === Stage.opening
      ? <Opening setStage={setStage} isStart={isStart} setIsStart={setIsStart} />
      : stage === Stage.menu
        ? <Menu setStage={setStage} sceneRef={sceneRef} />
        : <Game toMenu={toMenu} sceneRef={sceneRef} />}
  </Context.Provider>
}

export default Home;