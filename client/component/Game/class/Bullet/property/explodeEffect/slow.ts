import { Effect, add, SystemE, sys } from '../../../explode';
import { type, effect } from '../../../explode/property';

@sys(type('fieldGravity'))
@effect('slow')
class FieldSystem extends SystemE { }

@add(FieldSystem)
export class Slow extends Effect { };