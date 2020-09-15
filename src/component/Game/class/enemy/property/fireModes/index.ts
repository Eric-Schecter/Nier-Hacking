import { quick } from './quick';
import { quickScatter } from './quickScatter';
import { fixedScatter } from './fixedScatter';
import { random } from './random';
import { scatter } from './scatter';
import { follow } from './follow';
import { slow } from './slow';
import { normal } from './normal';
import { magnetic } from './magnetic';
// import { laser } from './laser';
import { confuse } from './confuse';
import { shockwave } from './shockwave';

type Mode = 'quick' | 'quickScatter' | 'random' | 'scatter' | 'follow' | 'slow' | 'normal'
  | 'fixedScatter' | 'magnetic' | 'laser' | 'confuse' | 'shockwave';

export const fireMode = (mode: Mode) => {
  switch (mode) {
    case 'quick': return quick;
    case 'quickScatter': return quickScatter;
    case 'fixedScatter': return fixedScatter;
    case 'random': return random;
    case 'scatter': return scatter;
    case 'follow': return follow;
    case 'slow': return slow;
    case 'normal': return normal;
    case 'magnetic': return magnetic;
    // case 'laser': return laser;
    case 'confuse': return confuse;
    case 'shockwave': return shockwave;
    default: return (a: any) => a;
  }
}