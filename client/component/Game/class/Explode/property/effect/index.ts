import { slow } from './slow';
import { confuse } from './confuse';
import { push } from './push';

type Mode = 'slow' | 'confuse' | 'push';

export const effect = (mode: Mode) => {
  switch (mode) {
    case 'slow': return slow;
    case 'confuse': return confuse;
    case 'push': return push;
    default: return (a: any) => a;
  }
}