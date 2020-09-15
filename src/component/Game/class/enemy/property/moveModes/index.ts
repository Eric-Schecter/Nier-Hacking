import { circle } from './circle';
import { circleTwice } from './circleTwice';
import { rebound } from './rebound';
import { sin } from './sin';
import { follow } from './follow';
import { turnOnly } from './turnOnly';

type Mode = 'sin' | 'stop' | 'rebound' | 'circleTwice' | 'circle' | 'follow' | 'turnOnly';

export const moveMode = (mode: Mode) => {
  switch (mode) {
    case 'sin': return sin;
    case 'rebound': return rebound;
    case 'circleTwice': return circleTwice;
    case 'circle': return circle;
    case 'follow': return follow;
    case 'turnOnly': return turnOnly;
    default: return (a: any) => a;
  }
}