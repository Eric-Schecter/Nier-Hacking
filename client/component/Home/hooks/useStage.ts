import { useState, useEffect, useRef } from 'react';
import { useAudio } from '../../../hooks';
import { sounds } from '../../../sounds';

export const useStage = () => {
  const { opening } = sounds;
  const stagePreRef = useRef(-1);
  const [stage, setStage] = useState(1);
  const { audioRef } = useAudio();
  useEffect(() => {
    if (stagePreRef.current !== 0 && stagePreRef.current !== 1) {
      audioRef.current?.clear();
      audioRef.current?.play(opening.src ,opening.volume,opening.restartPoint);
    }
    stagePreRef.current = stage;
  }, [stage])
  return { stage, setStage, audioRef };
}