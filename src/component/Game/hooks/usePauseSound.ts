import { useRef, useEffect } from 'react';
import { State } from '../reducer';
import { useGetContext } from '../../Home/Home';
import { sounds } from '../../../sounds';

export const usePauseSound = (state: State, visited: boolean) => {
  const isFirstRef = useRef(true);
  const audioRef = useGetContext();
  useEffect(() => {
    if (!isFirstRef.current) {
      if(state.isPause){
        audioRef.current?.play(sounds.pause.src)
      }else{
        audioRef.current?.play(sounds.start.src)
      }
    }
    isFirstRef.current = false;
  }, [state.isPause,audioRef])
}