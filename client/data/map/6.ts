import { Enemy } from '../../component/Game/class';
import { moveMode, type,state,fireMode,explodeEffect } from '../../component/Game/class/enemy/property';
import { PlayerNormal } from '../player';

@moveMode('follow')
@fireMode('normal')
@state('protection')
@type('core')
@explodeEffect('normal')
class CoreEnemy extends Enemy { }

@moveMode('follow')
@fireMode('normal')
@type('guard')
@explodeEffect('normal')
class GuardEnemy extends Enemy { }

@type('block')
@fireMode('fixedScatter')
@explodeEffect('normal')
class StaticEnemy extends Enemy { }

const data = {
  profile: '/img/stage/2.jpg',
  map: {
    xSRatio: 0.5,
    ySRatio: 0.5,
    wSRatio: 1,
    hSRatio: 1,
    wWRatio: 2,
    hWRatio: 2,
  },
  players: [
    {
      type: PlayerNormal,
      x: 0.5,
      y: 0.6,
    },
  ],
  enemys: [
    {
      type: CoreEnemy,
      x: 0.5,
      y: 0.1,
    },
    {
      type: GuardEnemy,
      x: 0.7,
      y: 0.2,
    },
    {
      type: GuardEnemy,
      x: 0.3,
      y: 0.2,
    },
    {
      type: StaticEnemy,
      x: 0.6,
      y: 0.3,
    },
    {
      type: StaticEnemy,
      x: 0.4,
      y: 0.3,
    },
  ]
}

export default data;