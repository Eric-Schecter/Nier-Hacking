import { Player } from '../component/Game/class'
import { moveModeP, fireModeP, typeP,explodeEffectP } from '../component/Game/class/player/property';

@typeP('plane')
@moveModeP('free')
@fireModeP('normal')
@explodeEffectP('normal')
export class PlayerNormal extends Player { }