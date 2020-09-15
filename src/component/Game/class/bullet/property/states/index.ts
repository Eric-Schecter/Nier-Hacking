import { invincible } from './invincible';

type Mode = 'invincible';

export const state = (mode: Mode) => {
  switch (mode) {
    case 'invincible': return invincible;
    default: return (a: any) => a;
  }
}