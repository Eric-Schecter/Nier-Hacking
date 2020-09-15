import { useRef, useEffect } from 'react';
import { Player } from '../class';
import {State} from '../reducer';

export const useFire = (state: State, player: React.RefObject<Player>) => {
  const fireRef = useRef(0);
  useEffect(() => {
    let count = 0;
    const fire = () => {
      player.current && count % 7 === 0 && player.current.fire();
      count++;
      fireRef.current = requestAnimationFrame(fire);
    };

    if (state.fire) {
      fireRef.current = requestAnimationFrame(fire);
    } else {
      cancelAnimationFrame(fireRef.current);
    }
    return () => cancelAnimationFrame(fireRef.current);
  }, [state.fire])
}