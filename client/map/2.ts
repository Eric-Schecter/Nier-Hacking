import { Enemy } from '../component/Game/class/Enemy';
import { moveMode,fireMode,type } from '../component/Game/class/Enemy/property';

@moveMode('sin')
@fireMode('normal')
@type('core')
class CoreEnemy extends Enemy { }

const data = {
  profile: '/img/stage/0.jpg',
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
      y: 0.3,
    },
  ]
}
export default data;