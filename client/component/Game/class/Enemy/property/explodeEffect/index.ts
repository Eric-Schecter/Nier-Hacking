import { normal } from './normal';

type Mode = 'normal';

export const explodeEffect = (mode: Mode) => {
  switch (mode) {
    case 'normal': return normal;
    default: return (a: any) => a;
  }
}