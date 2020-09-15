import { useEffect } from 'react';
import { getContext } from '../../Home';
import { sounds } from '../../../sounds';

export const useBgMusic = () => {
  const { game } = sounds;
  const audioRef = getContext();
  useEffect(() => {
    audioRef.current?.clear();
    audioRef.current?.play(game.src, game.volume, game.restartPoint, game.endPoint);
    return () => audioRef.current?.clear();
  }, [])
}