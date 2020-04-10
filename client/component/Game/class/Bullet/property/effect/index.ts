import { magnetic } from './magnetic';

type Mode = 'magnetic';

export const effect = (mode: Mode) => {
  switch (mode) {
    case 'magnetic': return magnetic;
    default: return (a: any) => a;
  }
}