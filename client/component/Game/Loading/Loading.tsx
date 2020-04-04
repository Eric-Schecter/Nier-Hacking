import React, { FC } from 'react';

import s from './Loading.scss';
import { Props } from './types';

const Loading: FC<Props> = ({ isStart, percent, size }) => {
  if (isStart) {
    return null;
  }
  return <div className={`${s.loading} ${percent === 100 ? s.fadeout : ''}`}>
    <img alt='bg' src='/img/loading2.jpg' className={s.loadingBg} />
    <p>{percent}%</p>
    <p className={s.loadingBar} style={{ width: `${size.width * percent / 100}px` }} />
  </div>
}

export default Loading;                                                                                                                                                                                                                                                                                                              