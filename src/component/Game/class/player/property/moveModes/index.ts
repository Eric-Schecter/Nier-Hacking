import { free } from './free';

type Mode = 'free';

export const moveModeP = (mode: Mode) => {
  switch (mode) {
    case 'free': return free;
    default: return (a: any) => a;
  }
}