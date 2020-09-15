import React, { FC } from 'react';

import styles from './styles.module.scss';
import { Props } from './types';

const Title: FC<Props> = ({ str }) =>
  <div className={styles.title}>
    {str.split('').map((d, i) =>
      <p key={i} className={styles.showRight} style={{ animationDelay: `${i / 10}s` }}>{d}</p>)}
  </div>

export default Title;