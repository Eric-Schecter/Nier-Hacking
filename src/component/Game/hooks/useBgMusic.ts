import { useEffect } from 'react';
import { useGetContext } from '../../Home';
import { sounds } from '../../../sounds';

export const useBgMusic = () => {
  const { game } = sounds;
  const audioRef = useGetContext();
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) { return }
    audio.clear();
    audio.play(game.src, game.volume, game.restartPoint, game.endPoint);
    return () => audio.clear();
  }, [audioRef, game])
}