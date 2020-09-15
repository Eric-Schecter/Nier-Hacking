import { BubbleLine } from './bubbleLine';
import { FieldGravity ,FieldConfuse} from './field';
import { Line } from './line';
import { Particle } from './particle';
import { Ray } from './ray';
import { Shape } from './shape';
import { Wave, WaveRed } from './wave';

type Mode = 'bubbleLine' | 'fieldGravity' | 'fieldConfuse' | 'line' | 'particle' | 'ray' | 'shape' | 'wave' | 'waveRed' ;

export const type = (mode: Mode) => {
  switch (mode) {
    case 'bubbleLine': return BubbleLine;
    case 'fieldGravity': return FieldGravity;
    case 'fieldConfuse': return FieldConfuse;
    case 'line': return Line;
    case 'particle': return Particle;
    case 'ray': return Ray;
    case 'shape': return Shape;
    case 'wave': return Wave;
    case 'waveRed': return WaveRed;
    default: return (a: any) => a;
  }
}