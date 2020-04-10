import { Effect, add, SystemE, sys } from '../../../explode';
import { type, effect } from '../../../explode/property';

@sys(type('wave'))
@effect('push')
class WaveSystem extends SystemE { }

@add(WaveSystem)
export class Shokcwave extends Effect { };