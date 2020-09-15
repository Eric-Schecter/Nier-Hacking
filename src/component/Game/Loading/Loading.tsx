import React, { FC } from 'react';

import styles from './styles.module.scss';
import { Props } from './types';

const Loading: FC<Props> = ({ isStart, percent, size }) => {
  if (isStart) {
    return null;
  }
  return <div className={`${styles.loading} ${percent === 100 ? styles.fadeout : ''}`}>
    <img alt='bg' src='./img/loading2.jpg' className={styles.loadingBg} />
    <p>{percent}%</p>
    <p className={styles.loadingBar} style={{ width: `${size.width * percent / 100}px` }} />
  </div>
}

export default Loading;                                                                                                                                                                                                                                                                                                              