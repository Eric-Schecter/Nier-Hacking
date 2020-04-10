import { laser } from './laser';
import { magnetic } from './magnetic';
import { shockwave } from './shockwave';
import { arrow } from './arrow';
import { rect } from './rect';
import { ball } from './ball';
import { gravityBall } from './gravityBall';
import { explodeBall } from './explodeBall';
import { lightningBall } from './lightningBall';

type Mode = 'laser' | 'magnetic' | 'shockwave' | 'arrow' | 'rect' | 'ball' | 'gravityBall' | 'explodeBall' | 'lightningBall';

export const type = (mode: Mode) => {
  switch (mode) {
    case 'laser': return laser;
    case 'magnetic': return magnetic;
    case 'shockwave': return shockwave;
    case 'arrow': return arrow;
    case 'rect': return rect;
    case 'ball': return ball;
    case 'gravityBall': return gravityBall;
    case 'explodeBall': return explodeBall;
    case 'lightningBall': return lightningBall;
    default: return (a: any) => a;
  }
}