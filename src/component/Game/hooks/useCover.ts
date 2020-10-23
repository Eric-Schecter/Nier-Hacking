import { useEffect } from 'react';
import { Cover } from '../class';
import { Size } from '../types';
import { ratio } from '../Game';

export const useCover = (ref: React.RefObject<HTMLCanvasElement>, changeScene: boolean, size: Size) => {
  useEffect(() => {
    let timer: number;
    if (ref.current) {
      const context = ref.current.getContext('2d');
      if (!context) { return; }
      const { width, height } = size;
      const cover = new Cover(context, width * ratio, height * ratio)

      const draw = () => {
        if (!changeScene) {
          return cancelAnimationFrame(timer);
        }
        context.clearRect(0, 0, width * ratio, height * ratio);
        cover.display();
        timer = requestAnimationFrame(draw);
      }
      timer = requestAnimationFrame(draw)
    }

    return () => cancelAnimationFrame(timer);
  }, [ref, changeScene, size])
}