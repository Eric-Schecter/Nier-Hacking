import { plane } from './plane';

type Mode = 'plane' ;

export const type = (mode: Mode) => {
  switch (mode) {
    case 'plane': return plane;
    default: return (a: any) => a;
  }
}