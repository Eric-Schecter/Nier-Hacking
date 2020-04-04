import { useRef, useEffect } from 'react';
import { State } from '../reducer';
import { getContext } from '../../Home/Home';
import { sounds } from '../../../sounds';

export const usePauseSound = (state: State,visited:boolean) => {
  const isFirstRef = useRef(true);
  const audioRef = getContext();
  useEffect(() => {
    if (!isFirstRef.current && visited) {
      state.isPause
        ? audioRef.current?.play(sounds.pause.src)
        : audioRef.current?.play(sounds.start.src)
    }
    isFirstRef.current = false;
  }, [state.isPause,visited])
}