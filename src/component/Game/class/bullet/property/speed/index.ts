import { slow } from './slow';

type Mode =  'slow';

export const speed = (mode: Mode) => {
  switch (mode) {
    case 'slow': return slow;
    default: return (a: any) => a;
  }
}