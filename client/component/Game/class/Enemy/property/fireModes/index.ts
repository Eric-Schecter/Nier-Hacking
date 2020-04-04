import { quick } from './quick';
import { quickScatter } from './quickScatter';
import { random } from './random';
import { scatter } from './scatter';
import { follow } from './follow';
import { slow } from './slow';
import { normal } from './normal';

type Mode = 'quick' | 'quickScatter' | 'random' | 'scatter' | 'follow' | 'slow' | 'normal';

export const fireMode = (mode: Mode) => {
  switch (mode) {
    case 'quick': return quick;
    case 'quickScatter': return quickScatter;
    case 'random': return random;
    case 'scatter': return scatter;
    case 'follow': return follow;
    case 'slow': return slow;
    case 'normal': return normal;
    default: return (a: any) => a;
  }
}