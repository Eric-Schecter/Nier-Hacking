import { protection } from './protection';

type Mode = 'protection';

export const stateP = (mode: Mode) => {
  switch (mode) {
    case 'protection': return protection;
    default: return (a: any) => a;
  }
}