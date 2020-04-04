import { free } from './free';

type Mode = 'free';

export const moveMode = (mode: Mode) => {
  switch (mode) {
    case 'free': return free;
    default: return (a: any) => a;
  }
}