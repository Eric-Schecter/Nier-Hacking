import { laser } from './laser';
import { magnetic } from './magnetic';
import { shockwave } from './shockwave';
import { slow } from './slow';
import { arrow } from './arrow';
import { rect } from './rect';
import { ball } from './ball';

type Mode = 'laser' | 'magnetic' | 'shockwave' | 'slow' | 'arrow' | 'rect' | 'ball';

export const type = (mode: Mode) => {
  switch (mode) {
    case 'laser': return laser;
    case 'magnetic': return magnetic;
    case 'shockwave': return shockwave;
    case 'slow': return slow;
    case 'arrow': return arrow;
    case 'rect': return rect;
    case 'ball': return ball;
    default: return (a: any) => a;
  }
}