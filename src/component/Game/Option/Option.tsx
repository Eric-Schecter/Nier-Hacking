import React, { FC } from 'react';

import styles from './styles.module.scss';
import { Props } from './types';

const Option: FC<Props> = ({ title, op1, op2 }) =>
  <div className={styles.block} >
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.option}>
        <p className={styles.btn}>{op1.key}</p>
      </div>
      <p>{op1.text}</p>
      <div className={styles.option}>
        <p className={styles.btn}>{op2.key}</p>
      </div>
      <p>{op2.text}</p>
    </div>
  </div>

export default Option;