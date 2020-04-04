import React, { FC } from 'react';

import s from './Pause.scss';
import { Props } from './types';

const Pause: FC<Props> = ({ state }) => {
  if (!state.isPause) {
    return null;
  }
  return <div className={s.block} >
    <p className={s.title}>PAUSED</p>
  </div>
}

export default Pause;