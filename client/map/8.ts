import { Enemy } from '../component/Game/class/Enemy';
import { moveMode, type, fireMode,state } from '../component/Game/class/Enemy/property';

@moveMode('follow')
@fireMode('quickScatter')
@state('protection')
@type('core')
class CoreEnemy extends Enemy { }

@moveMode('follow')
@fireMode('normal')
@type('guard')
class GuardEnemy extends Enemy { }


const data = {
  profile: '/img/stage/1.jpg',
  map: {
    xRatio: 0.5,
    yRatio: 0.5,
    wRatio: 1,
    hRatio: 1,
  },
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