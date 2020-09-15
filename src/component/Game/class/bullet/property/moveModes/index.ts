import { follow } from './follow';
import { direct } from './direct';
import { normal } from './normal';
import { target } from './target';

type Mode = 'follow' | 'direct' | 'normal' | 'target';

export const moveMode = (mode: Mode) => {
  switch (mode) {
    case 'normal': return normal;
    case 'follow': return follow;
    case 'direct': return direct;
    case 'target': return target;
    default: return (a: any) => a;
  }
}