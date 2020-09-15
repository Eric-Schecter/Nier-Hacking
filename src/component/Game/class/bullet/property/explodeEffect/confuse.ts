import { Effect, add, SystemE, sys } from '../../../explode';
import { type, effect } from '../../../explode/property';

@sys(type('fieldConfuse'))
@effect('confuse')
class FieldSystem extends SystemE { }

@add(FieldSystem)
export class Confuse extends Effect { };