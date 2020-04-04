import { guard } from './guard';
import { block } from './block';
import { core } from './core';

type Mode = 'guard' | 'block' | 'core';

export const type = (mode: Mode) => {
  switch (mode) {
    case 'guard': return guard;
    case 'block': return block;
    case 'core': return core;
    default: return (a: any) => a;
  }
}