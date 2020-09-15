import { PlayerNormal } from '../player';

const data = {
  profile: './img/stage/3.jpg',
  map: {
    xSRatio: 0.5,
    ySRatio: 0.5,
    wSRatio: 2,
    hSRatio: 2,
    wWRatio: 3,
    hWRatio: 3,
  },
  players: [
    {
      type: PlayerNormal,
      x: 0.5,
      y: 0.8,
    },
  ],
  enemys: []
}

export default data;