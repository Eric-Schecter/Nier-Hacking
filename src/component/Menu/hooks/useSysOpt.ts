import { useEffect, useState } from 'react';

import { SysOpt } from '../../../types';
import { delay } from '../../../functions/delay';

export const useSysOpt = (visited: boolean, setVisited: Function) => {
  const [isHiding, setIsHiding] = useState(false);
  useEffect(() => {
    const hide = async (e: KeyboardEvent) => {
      if (e.keyCode === SysOpt.pause) {
        setIsHiding(true);
        await delay(250);
        setVisited(true);
      }
    }
    !visited
      ? window.addEventListener('keydown', hide)
      : window.removeEventListener('keydown', hide);
    return () => window.removeEventListener('keydown', hide);
  }, [visited,setIsHiding,setVisited])
  return { isHiding };
}