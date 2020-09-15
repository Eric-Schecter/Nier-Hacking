import { Enemy } from '../../component/Game/class';
import { moveMode, fireMode, type, explodeEffect } from '../../component/Game/class/enemy/property';
import { PlayerNormal } from '../player';

@moveMode('rebound')
@fireMode('normal')
@type('core')
@explodeEffect('normal')
class CoreEnemy extends Enemy { }

const data = {
  profile: './img/stage/0.jpg',
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
      y: 0.3,
    },
  ]
}

export default data;