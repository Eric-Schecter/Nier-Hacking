import React, { useRef, createContext, useContext } from 'react';

import Game from '../Game';
import Opening from '../Opening';
import Menu from '../Menu';
import { Stage } from './types';
import { useStage } from './hooks/useStage';

const Context = createContext<any>({});
export const getContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('Components must be used within <Home />')
  }
  return context;
}

const Home = () => {
  const sceneRef = useRef<number>(0);
  const { stage, setStage, audioRef } = useStage();

  return <Context.Provider value={audioRef}>
    {stage === Stage.opening
      ? <Opening setStage={setStage} />
      : stage === Stage.menu
        ? <Menu setStage={setStage} sceneRef={sceneRef} />
        : <Game toMenu={() => setStage(1)} sceneRef={sceneRef} />}
  </Context.Provider>
}

export default Home;