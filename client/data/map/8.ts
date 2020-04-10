import { Enemy } from '../../component/Game/class';
import { moveMode, type, fireMode,state,explodeEffect } from '../../component/Game/class/enemy/property';
import { PlayerNormal } from '../player';

@moveMode('follow')
@fireMode('quickScatter')
@state('protection')
@type('core')
@explodeEffect('normal')
class CoreEnemy extends Enemy { }

@moveMode('follow')
@fireMode('normal')
@type('guard')
@explodeEffect('normal')
class GuardEnemy extends Enemy { }

const data = {
  profile: '/img/stage/1.jpg',
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
  ]
}

export default data;