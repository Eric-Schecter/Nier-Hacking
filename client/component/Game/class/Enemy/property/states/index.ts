import { protection } from './protection';

type Mode = 'protection';

export const state = (mode: Mode) => {
  switch (mode) {
    case 'protection': return protection;
    default: return (a: any) => a;
  }
}