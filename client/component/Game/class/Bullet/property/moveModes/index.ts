import { follow } from './follow';
import { direct } from './direct';

type Mode = 'follow' | 'direct';

export const moveMode = (mode: Mode) => {
  switch (mode) {
    case 'follow': return follow;
    case 'direct': return direct;
    default: return (a: any) => a;
  }
}