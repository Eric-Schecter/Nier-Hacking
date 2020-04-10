import { Enemy } from '../component/Game/class';
import { moveMode, type, fireMode,explodeEffect } from '../component/Game/class/enemy/property';

@moveMode('follow')
@fireMode('normal')
@type('core')
@explodeEffect('normal')
class Enemy1 extends Enemy { }

@moveMode('follow')
@fireMode('normal')
@type('guard')
@explodeEffect('normal')
class Enemy2 extends Enemy { }

@moveMode('follow')
@fireMode('fixedScatter')
@type('core')
@explodeEffect('normal')
class Enemy3 extends Enemy { }

@moveMode('follow')
@fireMode('quick')
@type('core')
@explodeEffect('normal')
class Enemy4 extends Enemy { }

@moveMode('follow')
@fireMode('quickScatter')
@type('core')
@explodeEffect('normal')
class Enemy5 extends Enemy { }

@moveMode('follow')
@fireMode('random')
@type('core')
@explodeEffect('normal')
class Enemy6 extends Enemy { }

@moveMode('follow')
@fireMode('scatter')
@type('core')
@explodeEffect('normal')
class Enemy7 extends Enemy { }

@moveMode('follow')
@fireMode('slow')
@type('guard')
@explodeEffect('normal')
class Enemy8 extends Enemy { }

@moveMode('follow')
@type('guard')
@fireMode('magnetic')
@explodeEffect('normal')
class Enemy9 extends Enemy { }

@moveMode('follow')
@type('guard')
@fireMode('confuse')
@explodeEffect('normal')
class Enemy10 extends Enemy { }

@moveMode('follow')
@type('guard')
@fireMode('shockwave')
@explodeEffect('normal')
class Enemy11 extends Enemy { }

export const enemys = [
  Enemy1,
  Enemy2,
  Enemy3,
  Enemy4,
  Enemy5,
  Enemy6,
  Enemy7,
  Enemy8,
  Enemy9,
  Enemy10,
  Enemy11,
]