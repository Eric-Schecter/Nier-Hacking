import { useRef, useEffect } from 'react';
import { State } from '../reducer';

export const usePauseSound = (state: State) => {
  const isFirstRef = useRef(true);
  useEffect(() => {
    // isPauseRef.current = state.isPause;
    if (!isFirstRef.current) {
      state.isPause
        ? new Audio('/media/stop.ogg').play()
        : new Audio('/media/start.ogg').play();
    }
    isFirstRef.current = false;
  }, [state.isPause])
}