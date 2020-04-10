import { useState, useEffect, useRef } from 'react';
import { useAudio } from '../../../hooks';
import { sounds } from '../../../sounds';

export const useStage = (isStart:boolean) => {
  const { opening } = sounds;
  const stagePreRef = useRef(-1);
  const [stage, setStage] = useState(0);
  const { audioRef } = useAudio();
  useEffect(() => {
    if (stagePreRef.current !== 0 && stagePreRef.current !== 1 && isStart) {
      audioRef.current?.clear();
      audioRef.current?.play(opening.src ,opening.volume,opening.restartPoint);
    }
    stagePreRef.current = stage;
  }, [stage,isStart])
  useEffect(() => {
    if (isStart) {
      audioRef.current?.clear();
      audioRef.current?.play(opening.src ,opening.volume,opening.restartPoint);
    }
    stagePreRef.current = stage;
  }, [isStart])
  return { stage, setStage, audioRef };
}