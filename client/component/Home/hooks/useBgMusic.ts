import { useRef, useEffect } from 'react';

export const useBgMusic = () => {
  const bgRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const replay = () => {
      if (bgRef.current) {
        bgRef.current.currentTime = 17.2;
        bgRef.current.play();
      }
    }
    bgRef.current?.play();
    bgRef.current?.addEventListener('ended', replay);
    return () => bgRef.current?.removeEventListener('ended', replay);
  }, [bgRef.current])
  return { bgRef };
}